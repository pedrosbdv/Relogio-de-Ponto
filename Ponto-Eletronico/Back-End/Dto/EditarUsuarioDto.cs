using RegistroPonto.Enums;

namespace RegistroPonto.Dto
{
    public class EditarUsuarioDto
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public int Ramal { get; set; }

        public DepartamentoEnum Departamento { get; set; }

        public string Role { get; set; } = string.Empty;
    }
}
