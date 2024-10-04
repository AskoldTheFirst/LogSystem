using System.IO;
using System.Reflection;
using System.Text;
using LogClient.Types;
using System.Text.Json;

namespace LogClient
{
    public sealed class WebLogger : BaseLogger, ILogger
    {
        readonly HttpClient _httpClient;

        readonly Product _currentProduct;

        readonly LayerType _currentLayer;

        readonly string _hostName;

        public WebLogger(string logServerDomainName, Product currentProduct, LayerType currentLayer)
        {
            _hostName = logServerDomainName;
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
            string browser = null,
            string ipAddress = null,
            string tag1 = null,
            string tag2 = null,
            string tag3 = null)
        {
            Func<Task> func = async () =>
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
            };

            // Base class method knows better how to execute logging.
            await PerformActionAsync(func);
        }

        public async Task LogAsync(
            string message,
            Severity severity,
            Exception exception)
        {
            await LogAsync(message, severity, exception, null, null, null).ConfigureAwait(false);
        }

        public async Task<string> GenerateJavaScriptLoggerObjectAsync(Product product)
        {
            var assembly = Assembly.GetExecutingAssembly();
            string javaScriptResource = "LogClient.WebLogger.js";
            string javaScriptText = String.Empty;

            using (Stream stream = assembly.GetManifestResourceStream(javaScriptResource))
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    javaScriptText = await reader.ReadToEndAsync();
                }
            }

            if (!String.IsNullOrEmpty(javaScriptText))
            {
                javaScriptText = javaScriptText.Replace("{{host_name}}", _hostName);
                javaScriptText = javaScriptText.Replace("{{prod_id}}", ((int)product).ToString());
            }

            return javaScriptText;
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
