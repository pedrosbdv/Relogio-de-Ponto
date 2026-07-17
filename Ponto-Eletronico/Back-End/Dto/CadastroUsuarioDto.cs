using RegistroPonto.Enums;

namespace RegistroPonto.Dto
{
    public class CadastroUsuarioDto
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DepartamentoEnum Departamento { get; set; }
        public int Ramal { get; set; }
        public string Role { get; set; } // "Admin" ou "Comum"
    }
}
