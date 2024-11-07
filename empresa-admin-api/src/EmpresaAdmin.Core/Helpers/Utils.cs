using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace EmpresaAdmin.Core.Helpers
{
    public static class Utils
    {

        public static bool IsAny<T>(this IEnumerable<T> data)
        {
            return data != null && data.Any();
        }

        public static DateTime GetBrazilianDate()
        {
            var brasilia = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
            return TimeZoneInfo.ConvertTime(DateTime.UtcNow, brasilia);
        }

        public static async Task<T> DeserializeObjectResponse<T>(HttpResponseMessage responseMessage)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var content = await responseMessage.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<T>(content, options);
        }

        public static string GerarSenha()
        {
            string letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
            string caracteresEspeciais = "!@#$";
            string numeros = "0123456789";

            string caracteresPermitidos = letrasMaiusculas + letrasMinusculas + caracteresEspeciais + numeros;

            Random random = new Random();

            // Construa a senha
            char[] senha = new char[8];
            senha[0] = letrasMaiusculas[random.Next(letrasMaiusculas.Length)]; // Pelo menos uma letra maiúscula
            senha[1] = letrasMinusculas[random.Next(letrasMinusculas.Length)]; // Pelo menos uma letra minúscula
            senha[2] = caracteresEspeciais[random.Next(caracteresEspeciais.Length)]; // Pelo menos um caractere especial
            senha[3] = numeros[random.Next(numeros.Length)]; // Pelo menos um número

            // Preencha o restante da senha com caracteres aleatórios
            for (int i = 4; i < senha.Length; i++)
            {
                senha[i] = caracteresPermitidos[random.Next(caracteresPermitidos.Length)];
            }

            // Embaralhe a ordem dos caracteres na senha
            for (int i = senha.Length - 1; i > 0; i--)
            {
                int j = random.Next(i + 1);
                char temp = senha[i];
                senha[i] = senha[j];
                senha[j] = temp;
            }

            return new string(senha);
        }

        public static string CriptografarSenha(string senha)
        {
            return BCrypt.Net.BCrypt.HashPassword(senha);
        }

        public static bool VerificarSenha(string senha, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(senha, hash);
        }
    }
}
