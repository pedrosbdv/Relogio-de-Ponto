using RegistroPonto.Dto;
using RegistroPonto.Enums;
using RegistroPonto.Models;

namespace RegistroPonto.Service.UsuarioService
{
    public interface IUsuarioInterface
    {
        Task<ServiceResponseModel<UsuarioModel>> CadastrarUsuario(CadastroUsuarioDto novoUsuario);

        Task<ServiceResponseModel<List<UsuarioResponseDto>>> PesquisarUsuarios(string? nome, DepartamentoEnum? departamento, int? ramal);

        Task<ServiceResponseModel<UsuarioResponseDto>> GetUsuarioById(int id);

        Task<ServiceResponseModel<List<UsuarioModel>>> UpdateUsuario(EditarUsuarioDto editarUsuario);

        Task<ServiceResponseModel<bool>> AlterarSenha(int usuarioId, AlterarSenhaDto dto);

        Task<ServiceResponseModel<List<UsuarioModel>>> DeleteUsuario(int id);

    }
}
