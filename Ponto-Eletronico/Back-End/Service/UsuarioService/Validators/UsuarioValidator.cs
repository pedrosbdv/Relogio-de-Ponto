using Microsoft.AspNetCore.Identity;
using RegistroPonto.Models;

namespace RegistroPonto.Service.UsuarioService.Validators
{
    public class UsuarioValidator
    {

        private readonly UserManager<UsuarioModel> _userManager;


        public UsuarioValidator(UserManager<UsuarioModel> userManager)
        {
            _userManager = userManager;
        }



        public async Task<string?> ValidarEmail(string email, int? idUsuario = null)
        {
            var usuario = await _userManager.FindByEmailAsync(email);
            if (usuario == null)
            {
                return null;
            }

            if (idUsuario.HasValue && usuario.Id == idUsuario)
            {
                return null;
            }

            return "Este email já está cadastrado.";

        }

    }
}
