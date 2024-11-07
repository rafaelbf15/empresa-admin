import useAxiosAuth from "@/hooks/useAxiosAuth";
import { FuncionarioType } from "@/types";
import { Helpers } from "@/utils";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@material-tailwind/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";


interface IProps {
  funcionario?: FuncionarioType | null;
  update: () => void;
  handler: () => void;
}

export default function FuncionarioForm({ funcionario, update, handler }: IProps) {
  const axiosAuth = useAxiosAuth();
  const [values, setValues] = useState<FuncionarioType>({
    id: funcionario?.id,
    nome: funcionario?.nome ?? '',
    sobrenome: funcionario?.sobrenome ?? '',
    emailCorporativo: funcionario?.emailCorporativo ?? '',
    numeroChapa: funcionario?.numeroChapa,
    telefones: funcionario?.telefones ?? '',
    telefoneList: funcionario?.telefoneList ?? [],
    liderId: funcionario?.liderId,
    nomeLider: funcionario?.nomeLider ?? '',
    senha: funcionario?.senha ?? '',
    userId: funcionario?.userId,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [liderOptions, setLiderOptions] = useState<{ value: string; label: string }[]>([]);

  const fetchFuncionarios = async () => {
    try {
      const response = await axiosAuth.get<FuncionarioType[]>("v1/funcionario");
      if (response.data?.length > 0) {
        const options = response.data
          .filter(func => func.id !== funcionario?.id) 
          .map(func => ({
            value: func.id as string,
            label: `${func.nome} ${func.sobrenome}`,
          }));
        setLiderOptions(options);
      }
    } catch (error) {
      toast.error("Erro ao carregar lista de líderes");
    }
  };

  useEffect(() => {
    fetchFuncionarios();
    setValues({
      id: funcionario?.id,
      nome: funcionario?.nome ?? '',
      sobrenome: funcionario?.sobrenome ?? '',
      emailCorporativo: funcionario?.emailCorporativo ?? '',
      numeroChapa: funcionario?.numeroChapa,
      telefoneList: funcionario?.telefoneList ?? [],
      liderId: funcionario?.liderId,
      nomeLider: funcionario?.nomeLider ?? '',
      senha: funcionario?.senha ?? '',
      userId: funcionario?.userId,
    });
  }, [funcionario]);



  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const msgSuccess = funcionario ? 'Funcionário atualizado com sucesso!' : 'Funcionário salvo com sucesso!';
    const msgError = funcionario ? 'Erro ao atualizar funcionário!' : 'Erro ao salvar funcionário!';

    try {
      const dataToSend = {
        ...values,
        telefones: values.telefoneList.join(", "), 
      };
      setIsLoading(true);
      const response = await axiosAuth.request({
        url: 'v1/funcionario/' + (funcionario ? `${funcionario.id}` : ''),
        method: funcionario ? 'PUT' : 'POST',
        data: dataToSend,
      });
      setIsLoading(false);
      if (response.status === 200 || response.status === 201) {
        toast.success(msgSuccess);
        update();
      }
    } catch (error) {
      setIsLoading(false);
      if ((error as any).response?.data?.statusCode === 400) {
        setErrors((error as any).response.data.message?.map((msg: any) => ({ message: msg })));
      }
      toast.error(msgError);
    }
  };

  const handleTelefoneChange = (index: number, value: string) => {
    const newTelefoneList = [...values.telefoneList];
    newTelefoneList[index] = value;
    setValues({ ...values, telefoneList: newTelefoneList });
  };

  const addTelefone = () => {
    setValues({ ...values, telefoneList: [...values.telefoneList, ""] });
  };

  const removeTelefone = (index: number) => {
    const newTelefoneList = values.telefoneList.filter((_, i) => i !== index);
    setValues({ ...values, telefoneList: newTelefoneList });
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        {errors?.length > 0 &&
          errors.map((error, i) => (
            <p key={i} className="text-red-500 text-sm mt-2">
              {error.message}
            </p>
          ))}
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <div className="mb-4">
            <Input
              label="Nome"
              name="nome"
              required
              size="lg"
              value={values.nome}
              onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
          </div>
          <div className="mb-4">
            <Input
              label="Sobrenome"
              name="sobrenome"
              required
              size="lg"
              value={values.sobrenome}
              onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
          </div>
          <div className="mb-4">
            <Input
              label="Email Corporativo"
              name="emailCorporativo"
              required
              size="lg"
              type="email"
              value={values.emailCorporativo}
              onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Líder</label>
            <Select
              options={liderOptions}
              value={liderOptions.find(option => option.value === values.liderId) || null}
              onChange={(selectedOption) => setValues({ ...values, liderId: selectedOption?.value })}
              placeholder="Selecione o líder"
              isClearable
              className="w-full"
              noOptionsMessage={() => "Não há funcionários cadastrados"}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Telefones</label>
            {values.telefoneList.map((telefone, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  label="Telefone"
                  name="telefone"
                  size="lg"
                  value={telefone}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleTelefoneChange(index, event.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                <button
                  type="button"
                  onClick={() => removeTelefone(index)}
                  className="ml-2 p-1 text-red-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTelefone}
              className="mt-2 text-blue-500 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Adicionar Telefone
            </button>
          </div>
          <div className="flex">
            <Button type="submit" variant="gradient" disabled={isLoading} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button
              type="button"
              variant="text"
              color="red"
              onClick={handler}
              className="ml-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
