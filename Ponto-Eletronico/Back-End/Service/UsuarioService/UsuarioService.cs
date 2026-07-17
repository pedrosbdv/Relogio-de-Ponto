using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RegistroPonto.DataContext;
using RegistroPonto.Dto;
using RegistroPonto.Enums;
using RegistroPonto.Models;
using RegistroPonto.Service.UsuarioService.Validators;

namespace RegistroPonto.Service.UsuarioService
{
    public class UsuarioService : IUsuarioInterface
    {

        private readonly ApplicationDdContext _context;
        private readonly UserManager<UsuarioModel> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly IdentityErrorService _identityErrorService;
        private readonly UsuarioValidator _usuarioValidator;


        public UsuarioService(
            ApplicationDdContext context,
            UserManager<UsuarioModel> userManager,
            RoleManager<IdentityRole<int>> roleManager,
            IdentityErrorService identityErrorService,
            UsuarioValidator usuarioValidator)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _identityErrorService = identityErrorService;
            _usuarioValidator = usuarioValidator;
        }



        // CADASTRAR USUARIO
        public async Task<ServiceResponseModel<UsuarioModel>> CadastrarUsuario(CadastroUsuarioDto novoUsuario)
        {
            ServiceResponseModel<UsuarioModel> response = new();


            try
            {

                if (novoUsuario == null)
                {
                    response.Sucesso = false;
                    response.Mensagem = "Informar dados.";
                    return response;
                }


                var erroEmail =
                    await _usuarioValidator.ValidarEmail(novoUsuario.Email);


                if (erroEmail != null)
                {
                    response.Sucesso = false;
                    response.Mensagem = erroEmail;
                    return response;
                }



                var usuario = new UsuarioModel
                {
                    UserName = novoUsuario.Email,
                    Email = novoUsuario.Email,
                    Nome = novoUsuario.Nome,
                    Departamento = novoUsuario.Departamento,
                    Ramal = novoUsuario.Ramal
                };



                var resultado =
                    await _userManager.CreateAsync(usuario, novoUsuario.Senha);



                if (!resultado.Succeeded)
                {
                    response.Sucesso = false;
                    response.Mensagem =
                        _identityErrorService.Traduzir(resultado.Errors);

                    return response;
                }



                string role =
                    string.IsNullOrWhiteSpace(novoUsuario.Role)
                    ? "Comum"
                    : novoUsuario.Role;



                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(
                        new IdentityRole<int>(role));
                }



                await _userManager.AddToRoleAsync(usuario, role);



                response.Dados = usuario;
                response.Mensagem =
                    "Usuário cadastrado com sucesso.";

            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }



            return response;

        }





        // PESQUISAR USUARIOS
        public async Task<ServiceResponseModel<List<UsuarioResponseDto>>> PesquisarUsuarios(
            string? nome,
            DepartamentoEnum? departamento,
            int? ramal)
        {

            ServiceResponseModel<List<UsuarioResponseDto>> response = new();


            try
            {

                IQueryable<UsuarioModel> query =
                    _context.Users.AsQueryable();



                if (!string.IsNullOrWhiteSpace(nome))
                {
                    query =
                        query.Where(x =>
                        x.Nome.Contains(nome));
                }



                if (departamento.HasValue)
                {
                    query =
                    query.Where(x =>
                    x.Departamento == departamento);
                }



                if (ramal.HasValue)
                {
                    query =
                    query.Where(x =>
                    x.Ramal == ramal);
                }



                var usuarios =
                    await query.ToListAsync();



                var lista = new List<UsuarioResponseDto>();


                foreach (var usuario in usuarios)
                {

                    var roles =
                        await _userManager.GetRolesAsync(usuario);



                    lista.Add(new UsuarioResponseDto
                    {
                        Id = usuario.Id,
                        Nome = usuario.Nome,
                        Email = usuario.Email,
                        Ramal = usuario.Ramal.ToString(),
                        Departamento = usuario.Departamento,
                        Role = roles.FirstOrDefault() ?? "Comum"
                    });

                }



                response.Dados = lista;
                response.Mensagem =
                    "Usuários encontrados.";

            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }


            return response;

        }





        // BUSCAR POR ID
        public async Task<ServiceResponseModel<UsuarioResponseDto>> GetUsuarioById(int id)
        {

            ServiceResponseModel<UsuarioResponseDto> response = new();


            try
            {

                var usuario =
                    await _context.Users
                    .FirstOrDefaultAsync(x => x.Id == id);



                if (usuario == null)
                {
                    response.Sucesso = false;
                    response.Mensagem =
                        "Usuário não localizado.";

                    return response;
                }



                response.Dados =
                    await ConverterUsuarioDto(usuario);


                response.Mensagem =
                    "Usuário localizado.";

            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }


            return response;

        }





        // EDITAR USUARIO
        public async Task<ServiceResponseModel<List<UsuarioModel>>> UpdateUsuario(EditarUsuarioDto editarUsuario)
        {

            ServiceResponseModel<List<UsuarioModel>> response = new();


            try
            {

                var usuario =
                    await _context.Users
                    .FirstOrDefaultAsync(x =>
                    x.Id == editarUsuario.Id);



                if (usuario == null)
                {
                    response.Sucesso = false;
                    response.Mensagem =
                        "Usuário não localizado.";

                    return response;
                }



                var erroEmail =
                    await _usuarioValidator.ValidarEmail(
                        editarUsuario.Email,
                        editarUsuario.Id);



                if (erroEmail != null)
                {
                    response.Sucesso = false;
                    response.Mensagem = erroEmail;
                    return response;
                }




                usuario.Nome = editarUsuario.Nome;
                usuario.Departamento = editarUsuario.Departamento;
                usuario.Ramal = editarUsuario.Ramal;



                if (usuario.Email != editarUsuario.Email)
                {

                    usuario.Email = editarUsuario.Email;
                    usuario.UserName = editarUsuario.Email;


                    var resultado =
                        await _userManager.UpdateAsync(usuario);



                    if (!resultado.Succeeded)
                    {
                        response.Sucesso = false;
                        response.Mensagem =
                            _identityErrorService.Traduzir(resultado.Errors);

                        return response;
                    }

                }



                var rolesAtuais =
                    await _userManager.GetRolesAsync(usuario);



                if (!rolesAtuais.Contains(editarUsuario.Role))
                {

                    if (rolesAtuais.Any())
                    {
                        await _userManager.RemoveFromRolesAsync(
                            usuario,
                            rolesAtuais);
                    }


                    await _userManager.AddToRoleAsync(
                        usuario,
                        editarUsuario.Role);

                }



                await _context.SaveChangesAsync();



                response.Dados =
                    await _context.Users.ToListAsync();


                response.Mensagem =
                    "Usuário atualizado com sucesso.";

            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }



            return response;

        }

        //TROCAR SENHA
        public async Task<ServiceResponseModel<bool>> AlterarSenha(int usuarioId, AlterarSenhaDto dto)
        {

            ServiceResponseModel<bool> response = new();
            try
            {

                var usuario =
                    await _userManager.FindByIdAsync(usuarioId.ToString());


                if (usuario == null)
                {
                    response.Sucesso = false;
                    response.Mensagem = "Usuário não localizado.";
                    return response;
                }



                if (dto.NovaSenha != dto.ConfirmarSenha)
                {
                    response.Sucesso = false;
                    response.Mensagem =
                        "A confirmação da senha não confere.";

                    return response;
                }



                var resultado =
                    await _userManager.ChangePasswordAsync(
                        usuario,
                        dto.SenhaAtual,
                        dto.NovaSenha
                    );



                if (!resultado.Succeeded)
                {
                    response.Sucesso = false;
                    response.Mensagem =
                        _identityErrorService.Traduzir(resultado.Errors);

                    return response;
                }



                response.Dados = true;
                response.Mensagem =
                    "Senha alterada com sucesso.";

            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }
            return response;
        }





        // DELETE
        public async Task<ServiceResponseModel<List<UsuarioModel>>> DeleteUsuario(int id)
        {

            ServiceResponseModel<List<UsuarioModel>> response = new();



            try
            {

                var usuario =
                    await _userManager.FindByIdAsync(
                        id.ToString());



                if (usuario == null)
                {
                    response.Sucesso = false;
                    response.Mensagem =
                        "Usuário não localizado.";

                    return response;
                }



                await _userManager.DeleteAsync(usuario);



                response.Dados =
                    await _context.Users.ToListAsync();


                response.Mensagem =
                    "Usuário removido.";

            }
            catch (Exception ex)
            {
                response.Sucesso = false;
                response.Mensagem = ex.Message;
            }


            return response;

        }





        private async Task<UsuarioResponseDto> ConverterUsuarioDto(
            UsuarioModel usuario)
        {

            var roles =
                await _userManager.GetRolesAsync(usuario);



            return new UsuarioResponseDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Ramal = usuario.Ramal.ToString(),
                Departamento = usuario.Departamento,
                Role = roles.FirstOrDefault() ?? "Comum"
            };

        }

    }
}