using System.Text;
using LogClient.Types;
using System.Text.Json;

namespace LogClient
{
    public sealed class WebLogger : ILogger
    {
        readonly HttpClient _httpClient;

        readonly Product _currentProduct;

        readonly LayerType _currentLayer;

        public WebLogger(string logServerDomainName, Product currentProduct, LayerType currentLayer)
        {
            _httpClient = new HttpClient();
            _httpClient.Timeout = TimeSpan.FromSeconds(3);
            _httpClient.BaseAddress = new Uri(logServerDomainName);
            _currentProduct = currentProduct;
            _currentLayer = currentLayer;
        }

        public async Task LogAsync(
            string message,
            Severity severity,
            Exception exception,
            string user,
            string requestContext,
            string environmentContect,
            string browser= null,
            string ipAddress = null,
            string tag1 = null, 
            string tag2 = null,
            string tag3 = null)
        {
            try
            {
                string processedException = ProcessException(exception);
                Log newLog = new()
                {
                    Message = message,
                    Severity = severity,
                    Exception = processedException,
                    Username = user,
                    Browser = browser,
                    IpAddress = ipAddress,
                    Tag1 = tag1,
                    Tag2 = tag2,
                    Tag3 = tag3,
                    DT = DateTime.Now.ToString(),
                    LayerType = _currentLayer,
                    Product = _currentProduct,
                    EnvironmentCtx = environmentContect,
                    RequestCtx = requestContext
                };

                string json = JsonSerializer.Serialize(newLog);
                var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
                await _httpClient.PostAsync("/api/Log", stringContent).ConfigureAwait(false);
            }
            catch(Exception ex)
            {
                // just to swallow the exception.

                #if DEBUG
                    Console.WriteLine(ex.Message);
                #endif
            }
        }

        public async Task LogAsync(
            string message,
            Severity severity,
            Exception exception)
        {
            await LogAsync(message, severity, exception, null, null, null).ConfigureAwait(false);
        }

        public string GenerateJavaScriptLoggerObject()
        {
            
            return "";
        }

        private static string ProcessException(Exception ex)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("Message: ");
            sb.Append(ex.Message);
            sb.AppendLine();

            if (ex.StackTrace != null)
            {
                sb.AppendLine("StackTrace: ");
                sb.Append(ex.StackTrace);
                sb.AppendLine();
            }
            
            if (ex.InnerException != null)
            {
                sb.AppendLine("Inner exception: ");
                sb.Append(ProcessException(ex.InnerException));
                sb.AppendLine();
            }

            return sb.ToString();
        }
    }
}
