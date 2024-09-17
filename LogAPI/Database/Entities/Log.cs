
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using LogAPI.Types;

namespace LogAPI.Database.Entities
{
    public class Log
    {
        public int Id { get; set; }

        public Product ProductId { get; set; }

        [Required]
        public Severity Severity { get; set; }

        [Required]
        public DateTime LogDTServer { get; set; }

        [Required]
        public DateTime LogDTClient { get; set; }

        [Required]
        public string Message { get; set; }

        public string Username { get; set; }

        public string RequestCtx { get; set; }

        public string EnvironmentCtx { get; set; }

        public string Browser { get; set; }

        public string IpAddress { get; set; }

        public string Exception { get; set; }

        [Required]
        public LayerType LayerType { get; set; }

        public string Tag1 { get; set; }

        public string Tag2 { get; set; }

        public string Tag3 { get; set; }

        [DefaultValue(0)]
        [Required]
        public bool IsMarked { get; set; }
    }
}