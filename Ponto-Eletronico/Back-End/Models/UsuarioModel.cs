using Microsoft.AspNetCore.Identity;
using RegistroPonto.Enums;

namespace RegistroPonto.Models
{
    public class UsuarioModel : IdentityUser<int>
    {
        public string Nome { get; set; }
        public DepartamentoEnum Departamento { get; set; }
        public int Ramal { get; set; }
        public DateTime DataDeCriacao { get; set; } = DateTime.Now.ToLocalTime();
    }
}