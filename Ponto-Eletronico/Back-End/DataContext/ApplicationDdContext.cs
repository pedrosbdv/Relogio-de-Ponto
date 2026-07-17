using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RegistroPonto.Models;

namespace RegistroPonto.DataContext
{
    public class ApplicationDdContext : IdentityDbContext<UsuarioModel, IdentityRole<int>, int>
    {
        public ApplicationDdContext(DbContextOptions<ApplicationDdContext> options) : base(options)
        {
        }

        public DbSet<RelogioPontoModel> RelogioPonto { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Renomeia a tabela de Identity (AspNetUsers) para "Usuario", mantendo seu nome atual
            builder.Entity<UsuarioModel>().ToTable("Usuario");
        }
    }
}