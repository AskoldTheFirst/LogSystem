using LogAPI.Database.Entities;
using LogAPI.Types;

namespace LogAPI.DTOs
{
    public class LogDto
    {
        public LogDto()
        {
        }

        public LogDto(Log dbLog)
        {
        }

        public Product ProductId { get; set; }

        public Severity Severity { get; set; }

        public DateTime DT { get; set; }

        public string Message { get; set; }

        public string Username { get; set; }

        public string RequestCtx { get; set; }

        public string EnvironmentCtx { get; set; }

        public string Browser { get; set; }

        public string IpAddress { get; set; }

        public string Exception { get; set; }

        public LayerType LayerType { get; set; }

        public string Tag1 { get; set; }

        public string Tag2 { get; set; }

        public string Tag3 { get; set; }

        public Log ToDbEntity()
        {
            return new Log {
                ProductId = ProductId,
                Severity = Severity,
                LogDTClient = DT,
                Message = Message,
                Username = Username,
                RequestCtx = RequestCtx,
                EnvironmentCtx = EnvironmentCtx,
                Browser = Browser,
                IpAddress = IpAddress,
                Exception = Exception,
                LayerType = LayerType,
                Tag1 = Tag1,
                Tag2 = Tag2,
                Tag3 = Tag3,
            };
        }
    }
}
