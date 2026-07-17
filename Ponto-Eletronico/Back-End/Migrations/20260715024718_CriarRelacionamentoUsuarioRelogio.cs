using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistroPonto.Migrations
{
    /// <inheritdoc />
    public partial class CriarRelacionamentoUsuarioRelogio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Senha",
                table: "Usuario",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "RelogioPonto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioId = table.Column<int>(type: "int", nullable: false),
                    id_usuario = table.Column<int>(type: "int", nullable: false),
                    DataHoraEntrada = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataHoraSaida = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UsuarioModelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelogioPonto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelogioPonto_Usuario_UsuarioModelId",
                        column: x => x.UsuarioModelId,
                        principalTable: "Usuario",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RelogioPonto_UsuarioModelId",
                table: "RelogioPonto",
                column: "UsuarioModelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RelogioPonto");

            migrationBuilder.AlterColumn<string>(
                name: "Senha",
                table: "Usuario",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
