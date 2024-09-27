using LogAPI.Database.Entities;
using LogAPI.Types;

namespace LogAPI.DTOs
{
    public class TraceDto
    {
        public TraceDto(Trace dbTrace)
        {
            Product = dbTrace.ProductId;
            Message = dbTrace.Message;
            Username = dbTrace.Username;
            DT = dbTrace.LogDTClient;
            Ticks = dbTrace.Ticks;
            SessionId = dbTrace.SessionId;
            Tag1 = dbTrace.Tag1;
            Tag2 = dbTrace.Tag2;
            Tag3 = dbTrace.Tag3;
        }

        public Product Product { get; set; }

        public string Message { get; set; }

        public string Username { get; set; }

        public DateTime DT { get; set; }

        public long Ticks { get; set; }

        public long SessionId { get; set; }

        public string Tag1 { get; set; }

        public string Tag2 { get; set; }

        public string Tag3 { get; set; }

        public Trace ToDbEntity()
        {
            return new Trace {
                ProductId = Product,
                Message = Message,
                Username = Username,
                LogDTClient = DT,
                Ticks = Ticks,
                SessionId = SessionId,
                Tag1 = Tag1,
                Tag2 = Tag2,
                Tag3 = Tag3,
            };
        }
    }
}
