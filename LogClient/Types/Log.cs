
namespace LogClient.Types
{
    public class Log
    {
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
    }
}
