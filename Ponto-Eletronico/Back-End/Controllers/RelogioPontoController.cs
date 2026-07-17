using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RegistroPonto.Enums;
using RegistroPonto.Models;
using RegistroPonto.Service.RelogioPontoService;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Claims;

namespace RegistroPonto.Controllers
{
    [Route("api/registro-ponto")]
    [ApiController]
    [Authorize]
    public class RelogioPontoController : ControllerBase
    {
        private readonly IRelogioPontoInterface _relogioPontoInterface;

        public RelogioPontoController(IRelogioPontoInterface relogioPontoInterface)
        {
            _relogioPontoInterface = relogioPontoInterface;
        }

        private int UsuarioLogadoId => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);


        // Cadastrar a batida do ponto
        [HttpPost]
        [SwaggerOperation(
            Summary = "Registrar entrada",
            Description = "Registra o horário de entrada do funcionário autenticado."
        )]
        public async Task<ActionResult<ServiceResponseModel<RelogioPontoModel>>> CadastrarRelogioPonto()
        {
            var novoBatePonto = new RelogioPontoModel
            {
                UsuarioId = UsuarioLogadoId
            };

            return Ok(await _relogioPontoInterface.CadastrarRelogioPonto(novoBatePonto));
        }

        //Registrar Saida
        [HttpPut("saida")]
        [SwaggerOperation(
            Summary = "Registrar saida",
            Description = "Registra o horário de saida do funcionário autenticado."
        )]
        public async Task<ActionResult<ServiceResponseModel<RelogioPontoModel>>> RegistrarSaida()
        {
            return Ok(await _relogioPontoInterface.RegistrarSaida(UsuarioLogadoId));
        }

        // Buscar batidas do ponto (do usuário logado)
        [HttpGet]
        [SwaggerOperation(
            Summary = "Busca todas as batidas de ponto do usuario",
            Description = "busca todas as batidas de pontos do usuario logado"
        )]
        public async Task<ActionResult<ServiceResponseModel<List<RelogioPontoModel>>>> PesquisarRelogioPonto(DateTime? dataInicio, DateTime? dataFim)
        {
            return Ok(await _relogioPontoInterface.PesquisarRelogioPonto(dataInicio, dataFim, UsuarioLogadoId));
        }

        [HttpGet("ponto-hoje")]
        [SwaggerOperation(
            Summary = "Busca os pontos realizados na data de hoje",
            Description = "busca o ponto realizado na data de hoje, para verificar se o usuario bateu a entrada ou a saida"
        )]
        public async Task<ActionResult<ServiceResponseModel<RelogioPontoModel>>> BuscarPontoHoje()
        {
            return Ok(await _relogioPontoInterface.BuscarPontoHoje(UsuarioLogadoId));
        }

        // Consulta exclusiva do Admin: todos os funcionários, filtrando por nome e/ou departamento
        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        [SwaggerOperation(
            Summary = "Busca todos os pontos (Apenas Admin)",
            Description = "Busca todos os pontos realizados, independente do usuario. Acesso para admin restrito"
        )]
        public async Task<ActionResult<ServiceResponseModel<List<RelogioPontoModel>>>> PesquisarRelogioPontoAdmin(string? nome, DepartamentoEnum? departamento, DateTime? dataInicio, DateTime? dataFim)
        {
            return Ok(await _relogioPontoInterface.PesquisarRelogioPontoAdmin(nome, departamento, dataInicio, dataFim));
        }
    }
}