using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RegistroPonto.Dto;
using RegistroPonto.Enums;
using RegistroPonto.Models;
using RegistroPonto.Service.TokenService;

namespace RegistroPonto.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<UsuarioModel> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly TokenService _tokenService;

        public AuthController(
            UserManager<UsuarioModel> userManager,
            RoleManager<IdentityRole<int>> roleManager,
            TokenService tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponseModel<LoginResponseModel>>> Login(LoginDto dto)
        {
            ServiceResponseModel<LoginResponseModel> response = new();

            var usuario = await _userManager.FindByEmailAsync(dto.Email);

            if (usuario == null || !await _userManager.CheckPasswordAsync(usuario, dto.Senha))
            {
                response.Sucesso = false;
                response.Mensagem = "Email ou senha inválidos.";
                return Unauthorized(response);
            }

            var roles = await _userManager.GetRolesAsync(usuario);
            var token = _tokenService.GenerateToken(usuario, roles);

            response.Dados = new LoginResponseModel
            {
                Token = token,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Roles = roles.ToList(),
                Departamento = usuario.Departamento.ToString(),
                Ramal = usuario.Ramal
            };
            response.Mensagem = "Login realizado com sucesso.";

            return Ok(response);
        }
    }
}