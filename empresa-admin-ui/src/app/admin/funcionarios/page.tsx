'use client'

import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowPathIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import FuncionarioForm from "@/components/FuncionarioForm";
import DialogConfirmation from "@/components/DialogConfirmation";
import { FuncionarioType } from "@/types";

export default function FuncionariosPage() {
  const TABLE_HEAD = [
    "Nome",
    "Sobrenome",
    "Email Corporativo",
    "Número de Chapa",
    "Telefones",
    "Líder",
    "Ações"
  ];

  const axiosAuth = useAxiosAuth();
  const [open, setOpen] = useState(false);
  const handler = () => setOpen(value => !value);

  const [funcionarios, setFuncionarios] = useState<FuncionarioType[]>([]);
  const [funcionario, setFuncionario] = useState<FuncionarioType | null>(null);
  const [editando, setEditando] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [desativar, setDesativar] = useState(false)

  const getFuncionarios = async () => {
    try {
      const response = await axiosAuth.get<FuncionarioType[]>(`v1/funcionario`);
      if (response.status === 200) {
        setFuncionarios(response.data);
      } else {
        setFuncionarios([]);
      }
    } catch (error) {
      toast.error('Erro ao carregar funcionários');
    }
  };

  useEffect(() => {
    getFuncionarios();
  }, []);

  const onEdit = (funcionario: FuncionarioType) => {
    setFuncionario(funcionario);
    setEditando(true);
    handler();
  };

  const novoFuncionario = () => {
    setFuncionario(null);
    setEditando(false);
    handler();
  };

  const update = () => {
    getFuncionarios();
    handler();
  };

  const handlerDialog = () => {
    setOpenDialog(!openDialog);
  };

  const onExcluir = (item: FuncionarioType) => {
    setFuncionario(item);
    setDesativar(true);
    handlerDialog();
  };

  const onAtivar = (item: FuncionarioType) => {
    setFuncionario(item);
    setDesativar(false);
    handlerDialog();
  };


  const submitDesativar = async () => {
    if (!funcionario?.id) return;

    try {
      setIsLoading(true);
      const response = await axiosAuth.patch(`v1/funcionario/${funcionario.id}`);
      setIsLoading(false);
      if (response.status === 200) {
        handlerDialog();
        toast.success('Funcionário removido com sucesso');
        getFuncionarios();
      }
    } catch (error) {
      handlerDialog();
      setIsLoading(false);
      toast.error('Erro ao remover funcionário');
      console.error(error);
    }
  };

  const submitAtivar = async () => {
    if (!funcionario?.id) return;

    try {
      setIsLoading(true);
      const response = await axiosAuth.patch(`v1/funcionario/${funcionario.id}/ativo`);
      setIsLoading(false);
      if (response.status === 200) {
        handlerDialog();
        toast.success("Funcionário ativado com sucesso");
        getFuncionarios();
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao ativar funcionário");
    }
  };

  const desativarAtivar = () => {
    if (desativar) {
      submitDesativar()
    } else {
      submitAtivar();
    } 
  }

  return (
    <Card className="mt-2 w-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Funcionários
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm" onClick={novoFuncionario}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Cadastrar Funcionário
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll md:h-[calc(75vh-2rem)] h-[calc(60vh-2rem)]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {funcionarios?.map((item, index) => {
              const isLast = index === funcionarios.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item.id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-bold"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {item.nome}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {item.sobrenome}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {item.emailCorporativo}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {item.numeroChapa}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {item.telefones}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {item.nomeLider || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center justify-between">
                      <Tooltip content="Editar">
                        <IconButton variant="text" onClick={() => onEdit(item)}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      {item.dataRemocao ? (
                        <Tooltip content="Ativar">
                          <IconButton variant="filled" color="green" onClick={() => onAtivar(item)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <ArrowPathIcon className="h-4 w-4 text-white" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip content="Remover">
                          <IconButton variant="filled" color="red" onClick={() => onExcluir(item)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <TrashIcon className="h-4 w-4 text-white" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <Dialog open={open} handler={handler} size="sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogHeader className="flex flex-col items-start"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Typography variant="h6" className="mb-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {editando ? 'Editar' : 'Novo'} Funcionário
          </Typography>
        </DialogHeader>
        <DialogBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <FuncionarioForm funcionario={funcionario} update={update} handler={handler} />
        </DialogBody>
      </Dialog>
      <DialogConfirmation open={openDialog} handler={handlerDialog} onSubmit={desativarAtivar} isLoading={isLoading}   title={`Tem certeza que deseja ${desativar ? 'desativar' : 'ativar'}?`}  />
    </Card>
  );
}