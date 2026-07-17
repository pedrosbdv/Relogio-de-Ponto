using RegistroPonto.Enums;

namespace RegistroPonto.Dto
{
    public class UsuarioResponseDto
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Ramal { get; set; } = string.Empty;


        public DepartamentoEnum Departamento { get; set; }


        public string DepartamentoDescricao => Departamento.ToString();


        public string Role { get; set; } = string.Empty;
    }
}