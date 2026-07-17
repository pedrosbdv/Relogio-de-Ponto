using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RegistroPonto.Models
{
    public class RelogioPontoModel
    {
        [Key]
        public int Id { get; set; }

        public int UsuarioId { get; set; }

        public UsuarioModel? Usuario { get; set; }
        
        public DateTime DataHoraEntrada { get; set; } = DateTime.Now.ToLocalTime();
        public DateTime? DataHoraSaida { get; set; }

    }
}
