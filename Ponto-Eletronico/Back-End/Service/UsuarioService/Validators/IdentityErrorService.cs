using Microsoft.AspNetCore.Identity;

namespace RegistroPonto.Service.UsuarioService.Validators
{
    public class IdentityErrorService
    {

        public string Traduzir(IEnumerable<IdentityError> erros)
        {
            var mensagens = new List<string>();


            foreach (var erro in erros)
            {

                switch (erro.Code)
                {

                    case "DuplicateUserName":
                    case "DuplicateEmail":
                        mensagens.Add("Este email já está cadastrado.");
                        break;


                    case "PasswordTooShort":
                        mensagens.Add("A senha deve possuir pelo menos 6 caracteres.");
                        break;


                    case "PasswordRequiresDigit":
                        mensagens.Add("A senha deve possuir número.");
                        break;


                    case "PasswordRequiresUpper":
                        mensagens.Add("A senha deve possuir letra maiúscula.");
                        break;


                    case "PasswordRequiresLower":
                        mensagens.Add("A senha deve possuir letra minúscula.");
                        break;


                    case "PasswordRequiresNonAlphanumeric":
                        mensagens.Add("A senha deve possuir caractere especial.");
                        break;


                    case "PasswordMismatch":
                        mensagens.Add("A senha atual está incorreta.");
                        break;


                    default:
                        mensagens.Add(erro.Description);
                        break;

                }

            }


            return string.Join(" | ", mensagens);

        }

    }
}