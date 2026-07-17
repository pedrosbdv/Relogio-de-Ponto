namespace RegistroPonto.Models
{
    public class LoginResponseModel
    {
        public string Token { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; } = new();
        public string Departamento { get; set; }
        public int Ramal { get; set; }
    }
}
