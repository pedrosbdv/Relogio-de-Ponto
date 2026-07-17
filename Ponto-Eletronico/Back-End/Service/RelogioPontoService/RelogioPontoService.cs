using Microsoft.EntityFrameworkCore;
using RegistroPonto.DataContext;
using RegistroPonto.Enums;
using RegistroPonto.Models;
using RegistroPonto.Service.UsuarioService;

namespace RegistroPonto.Service.RelogioPontoService
{
    public class RelogioPontoService : IRelogioPontoInterface
    {
        private readonly ApplicationDdContext _context;

        public RelogioPontoService(ApplicationDdContext context)
        {
            _context = context;
        }

        //Cadastrar o bate ponto
        public async Task<ServiceResponseModel<RelogioPontoModel>> CadastrarRelogioPonto(RelogioPontoModel novoBatePonto)
        {
            ServiceResponseModel<RelogioPontoModel> serviceResponse = new();

            try
            {
                if (novoBatePonto == null)
                {
                    serviceResponse.Dados = null;
                    serviceResponse.Mensagem = "Informar Dados";
                    serviceResponse.Sucesso = false;
                    return serviceResponse;
                }

                DateTime hoje = DateTime.Today;

                bool entradaJaRegistrada = await _context.RelogioPonto.AnyAsync(x => x.UsuarioId == novoBatePonto.UsuarioId && x.DataHoraEntrada.Date == hoje);

                if (entradaJaRegistrada)
                {
                    serviceResponse.Sucesso = false;
                    serviceResponse.Mensagem = "A entrada de hoje já foi registrada.";
                    return serviceResponse;
                }


                _context.RelogioPonto.Add(novoBatePonto);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = novoBatePonto;
                serviceResponse.Mensagem = "Registro de ponto cadastrado com sucesso.";
            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.InnerException?.Message ?? ex.Message;
                serviceResponse.Sucesso = false;
            }

            return serviceResponse;
        }

        //Registar a saida
        public async Task<ServiceResponseModel<RelogioPontoModel>> RegistrarSaida(int usuarioId)
        {
            ServiceResponseModel<RelogioPontoModel> response = new();

            try
            {
                var ponto = await _context.RelogioPonto
                    .Where(x => x.UsuarioId == usuarioId)
                    .Where(x => x.DataHoraSaida == null)
                    .OrderByDescending(x => x.DataHoraEntrada)
                    .FirstOrDefaultAsync();

                if (ponto == null)
                {
                    response.Sucesso = false;
                    response.Mensagem = "Nenhum ponto em aberto foi encontrado.";
                    return response;
                }

                if (ponto.DataHoraSaida != null)
                {
                    response.Sucesso = false;
                    response.Mensagem = "A saída de hoje já foi registrada.";
                    return response;
                }

                ponto.DataHoraSaida = DateTime.Now;

                await _context.SaveChangesAsync();

                response.Dados = ponto;
                response.Sucesso = true;
                response.Mensagem = "Saída registrada com sucesso.";
            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }

            return response;
        }

        //Buscar os pontos (usuário logado)
        public async Task<ServiceResponseModel<List<RelogioPontoModel>>> PesquisarRelogioPonto(DateTime? dataInicio, DateTime? dataFim, int? usuarioId)
        {
            ServiceResponseModel<List<RelogioPontoModel>> response = new();

            try
            {
                IQueryable<RelogioPontoModel> query = _context.RelogioPonto.Include(x => x.Usuario).AsQueryable();

                if (usuarioId.HasValue)
                {
                    query = query.Where(x => x.UsuarioId == usuarioId.Value);
                }


                if (dataInicio.HasValue)
                {
                    query = query.Where(x =>
                        x.DataHoraEntrada >= dataInicio.Value.Date);
                }


                if (dataFim.HasValue)
                {
                    DateTime dataFinal = dataFim.Value.Date.AddDays(1).AddTicks(-1);
                    query = query.Where(x => x.DataHoraEntrada <= dataFinal);

                }
                response.Dados = await query.OrderByDescending(x => x.DataHoraEntrada).ToListAsync();
                response.Sucesso = true;
                response.Mensagem = "Pontos encontrados com sucesso.";
            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }

            return response;
        }

        public async Task<ServiceResponseModel<RelogioPontoModel>> BuscarPontoHoje(int usuarioId)
        {
            ServiceResponseModel<RelogioPontoModel> response = new();

            try
            {
                DateTime hoje = DateTime.Today;

                var ponto = await _context.RelogioPonto
                    .Include(x => x.Usuario)
                    .Where(x => x.UsuarioId == usuarioId &&
                                x.DataHoraEntrada.Date == hoje)
                    .OrderByDescending(x => x.DataHoraEntrada)
                    .FirstOrDefaultAsync();

                response.Dados = ponto;
                response.Sucesso = true;
            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.InnerException?.Message ?? ex.Message;
            }

            return response;
        }

        // Consulta exclusiva do Admin: todos os funcionários, filtrando por nome e/ou departamento
        public async Task<ServiceResponseModel<List<RelogioPontoModel>>> PesquisarRelogioPontoAdmin(string? nome, DepartamentoEnum? departamento, DateTime? dataInicio, DateTime? dataFim)
        {
            ServiceResponseModel<List<RelogioPontoModel>> response = new();

            try
            {
                IQueryable<RelogioPontoModel> query = _context.RelogioPonto.Include(x => x.Usuario).AsQueryable();

                if (!string.IsNullOrWhiteSpace(nome))
                {
                    query = query.Where(x => x.Usuario != null && x.Usuario.Nome.Contains(nome));
                }

                if (departamento.HasValue)
                {
                    query = query.Where(x => x.Usuario != null && x.Usuario.Departamento == departamento.Value);
                }

                if (dataInicio.HasValue)
                {
                    query = query.Where(x => x.DataHoraEntrada >= dataInicio.Value.Date);
                }

                if (dataFim.HasValue)
                {
                    DateTime dataFinal = dataFim.Value.Date.AddDays(1).AddTicks(-1);
                    query = query.Where(x => x.DataHoraEntrada <= dataFinal);
                }

                response.Dados = await query.OrderByDescending(x => x.DataHoraEntrada).ToListAsync();
                response.Sucesso = true;
                response.Mensagem = "Pontos encontrados com sucesso.";
            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }

            return response;
        }
    }
}