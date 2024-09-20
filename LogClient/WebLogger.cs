using System.Text;
using LogClient.Types;
using System.Text.Json;

namespace LogClient
{
    public class WebLogger : ILogger, ITracer
    {
        readonly HttpClient _httpClient;

        readonly Product _currentProduct;

        readonly LayerType _currentLayer;

        public WebLogger(string logServerDomainName, Product currentProduct, LayerType currentLayer)
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri(logServerDomainName);
            _currentProduct = currentProduct;
            _currentLayer = currentLayer;
        }

        public async Task LogAsync(
            string message,
            Severity severity,
            string exception,
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
                Log newLog = new()
                {
                    Message = message,
                    Severity = severity,
                    Exception = exception,
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
            catch
            {
                // just to swallow the exception.
            }
        }

        public async Task LogAsync(
            string message,
            Severity severity,
            string exception)
        {
            await LogAsync(message, severity, exception, null, null, null).ConfigureAwait(false);
        }

        public Task TraceAsync()
        {
            throw new NotImplementedException();
        }

        public void WriteTraceToMemoryBuffer()
        {
            throw new NotImplementedException();
        }

        public Task FlushTraceMemoryBufferAsync()
        {
            throw new NotImplementedException();
        }

        public string GenerateJavaScriptLoggerObject()
        {
            return "window.document = {}";
        }
    }
}
