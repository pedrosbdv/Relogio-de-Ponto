using RegistroPonto.Enums;
using RegistroPonto.Models;

namespace RegistroPonto.Service.RelogioPontoService
{
    public interface IRelogioPontoInterface
    {
        Task<ServiceResponseModel<RelogioPontoModel>> CadastrarRelogioPonto(RelogioPontoModel novoBatePonto);

        Task<ServiceResponseModel<List<RelogioPontoModel>>> PesquisarRelogioPonto(DateTime? dataInicio, DateTime? dataFim, int? usuarioId);
        Task<ServiceResponseModel<RelogioPontoModel>> RegistrarSaida(int usuarioId);

        Task<ServiceResponseModel<RelogioPontoModel?>> BuscarPontoHoje(int usuarioId);

        // Consulta exclusiva do Admin: todos os funcionários, filtrando por nome e/ou departamento
        Task<ServiceResponseModel<List<RelogioPontoModel>>> PesquisarRelogioPontoAdmin(string? nome, DepartamentoEnum? departamento, DateTime? dataInicio, DateTime? dataFim);
    }
}
