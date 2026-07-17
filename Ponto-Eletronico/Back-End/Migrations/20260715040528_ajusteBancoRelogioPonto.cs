using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistroPonto.Migrations
{
    /// <inheritdoc />
    public partial class ajusteBancoRelogioPonto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RelogioPonto_Usuario_UsuarioModelId",
                table: "RelogioPonto");

            migrationBuilder.DropIndex(
                name: "IX_RelogioPonto_UsuarioModelId",
                table: "RelogioPonto");

            migrationBuilder.DropColumn(
                name: "UsuarioModelId",
                table: "RelogioPonto");

            migrationBuilder.DropColumn(
                name: "id_usuario",
                table: "RelogioPonto");

            migrationBuilder.CreateIndex(
                name: "IX_RelogioPonto_UsuarioId",
                table: "RelogioPonto",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_RelogioPonto_Usuario_UsuarioId",
                table: "RelogioPonto",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RelogioPonto_Usuario_UsuarioId",
                table: "RelogioPonto");

            migrationBuilder.DropIndex(
                name: "IX_RelogioPonto_UsuarioId",
                table: "RelogioPonto");

            migrationBuilder.AddColumn<int>(
                name: "UsuarioModelId",
                table: "RelogioPonto",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "id_usuario",
                table: "RelogioPonto",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RelogioPonto_UsuarioModelId",
                table: "RelogioPonto",
                column: "UsuarioModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_RelogioPonto_Usuario_UsuarioModelId",
                table: "RelogioPonto",
                column: "UsuarioModelId",
                principalTable: "Usuario",
                principalColumn: "Id");
        }
    }
}
