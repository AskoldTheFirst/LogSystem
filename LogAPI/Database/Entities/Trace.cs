
using System.ComponentModel.DataAnnotations;
using LogAPI.Types;

namespace LogAPI.Database.Entities
{
    public class Trace
    {
        public int Id { get; set; }

        public Product ProductId { get; set; }

        [Required]
        public string Message { get; set; }
        
        public string Username { get; set; }

        [Required]
        public DateTime LogDTClient { get; set; }

        public long Ticks { get; set; }

        public long SessionId { get; set; }

        public string Tag1 { get; set; }

        public string Tag2 { get; set; }

        public string Tag3 { get; set; }
    }
}