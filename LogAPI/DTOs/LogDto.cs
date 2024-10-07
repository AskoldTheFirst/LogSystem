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
            Product = dbLog.ProductId;
            Severity = dbLog.Severity;
            DT = dbLog.dtServer.ToString("dd-MM-yyyy hh:ss");
            Message = dbLog.Message;
            Username = dbLog.Username;
            RequestCtx = dbLog.RequestCtx;
            EnvironmentCtx = dbLog.EnvironmentCtx;
            Browser = dbLog.Browser;
            IpAddress = dbLog.IpAddress;
            Exception = dbLog.Exception;
            LayerType = dbLog.LayerType;
            Tag1 = dbLog.Tag1;
            Tag2 = dbLog.Tag2;
            Tag3 = dbLog.Tag3;
        }

        public Product Product { get; set; }

        public Severity Severity { get; set; }

        public string DT { get; set; }

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
                ProductId = Product,
                Severity = Severity,
                dtClient = String.IsNullOrEmpty(DT) ? DateTime.Now : DateTime.Parse(DT),
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
