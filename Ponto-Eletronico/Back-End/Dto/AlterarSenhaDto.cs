using System.ComponentModel.DataAnnotations;

namespace RegistroPonto.Dto
{
    public class AlterarSenhaDto
    {
        [Required(ErrorMessage = "Informe a senha atual.")]
        public string SenhaAtual { get; set; } = string.Empty;

        [Required(ErrorMessage = "Informe a nova senha.")]
        [MinLength(6, ErrorMessage = "A nova senha deve ter no mínimo 6 caracteres.")]
        public string NovaSenha { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirme a nova senha.")]
        public string ConfirmarSenha { get; set; } = string.Empty;
    }
}