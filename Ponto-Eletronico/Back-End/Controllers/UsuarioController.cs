using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RegistroPonto.Dto;
using RegistroPonto.Enums;
using RegistroPonto.Models;
using RegistroPonto.Service.UsuarioService;
using Swashbuckle.AspNetCore.Annotations;

namespace RegistroPonto.Controllers
{
    [Route("api/usuarios")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioInterface _usuarioInterface;

        public UsuarioController(IUsuarioInterface usuarioInterface)
        {
            _usuarioInterface = usuarioInterface;
        }

        //Cadastrar o usuario
        [HttpPost]
        [SwaggerOperation(
            Summary = "Cadastrar o usuario",
            Description = "Cadastra o usuario. Admin terá apenas o seu. Para facilitar o uso da api, foi criado um cadastro onde todo mundo tem acesso"
        )]
        public async Task<ActionResult<ServiceResponseModel<UsuarioModel>>> CadastrarUsuario(CadastroUsuarioDto novoUsuario)
        {
            var response = await _usuarioInterface.CadastrarUsuario(novoUsuario);


            if (!response.Sucesso)
            {
                return BadRequest(response);
            }


            return Ok(response);
        }



        //Buscar usuario
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(
            Summary = "Buscar o usuario (Apenas o Admin)",
            Description = "Apenas o Admin tera acesso, para buscar todos os usuarios"
        )]
        public async Task<ActionResult<ServiceResponseModel<List<UsuarioResponseDto>>>> PesquisarUsuarios(string? nome, DepartamentoEnum? departamento, int? ramal)
        {
            return Ok(await _usuarioInterface.PesquisarUsuarios(nome, departamento, ramal));
        }

        //Buscar unico usuario
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(
            Summary = "Busca unico usuario (Apenas o Admin)",
            Description = "Apenas o Admin tera acesso, para buscar apenas um unico usuario"
        )]
        public async Task<ActionResult<ServiceResponseModel<UsuarioResponseDto>>> GetUsuarioById(int id)
        {
            ServiceResponseModel<UsuarioResponseDto> serviceResponse = await _usuarioInterface.GetUsuarioById(id);
            return Ok(serviceResponse);
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(
            Summary = "Alterar o usuario (Apenas o Admin)",
            Description = "Apenas o Admin tera acesso, para alterar campos de e-mail, departamento entre outros"
        )]
        public async Task<ActionResult<ServiceResponseModel<List<UsuarioModel>>>> UpdateUsuario(EditarUsuarioDto editarUsuario)
        {
            var response = await _usuarioInterface.UpdateUsuario(editarUsuario);


            if (!response.Sucesso)
            {
                return BadRequest(response);
            }


            return Ok(response);
        }

        [Authorize]
        [HttpPut("alterar-senha")]
        [SwaggerOperation(
            Summary = "Trocar senha",
            Description = "Todo mundo consegue trocar a senha"
        )]
        public async Task<ActionResult<ServiceResponseModel<bool>>> AlterarSenha(AlterarSenhaDto dto)
        {

            var usuarioId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
            var response = await _usuarioInterface.AlterarSenha(usuarioId, dto);
            if (!response.Sucesso)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        //Deltar Usuario
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(
            Summary = "Deletar o usuario (Admin)",
            Description = "Apenas o administrador pode deletar o usuario"
        )]
        public async Task<ActionResult<ServiceResponseModel<List<UsuarioModel>>>> DeleteUsuario(int id)
        {
            return Ok(await _usuarioInterface.DeleteUsuario(id));
        }
    }
}
