using LogAPI.Types;

namespace LogAPI.DTOs
{
    public class TraceDto
    {
        public int Id { get; set; }
        
        public Product Product { get; set; }

        public string Message { get; set; }

        public string Username { get; set; }

        public DateTime DT { get; set; }

        public long Ticks { get; set; }

        public long SessionId { get; set; }

        public string Tag1 { get; set; }

        public string Tag2 { get; set; }

        public string Tag3 { get; set; }
    }
}
