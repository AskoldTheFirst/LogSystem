using System.Reflection;
using System.Text;
using System.Text.Json;
using LogClient.Types;

namespace LogClient
{
    public sealed class WebTracer : BaseLogger, ITracer
    {
        readonly HttpClient _httpClient;

        readonly Product _currentProduct;

        readonly string _hostName;


        public WebTracer(string hostName, Product currentProduct)
        {
            _hostName = hostName;
            _httpClient = new HttpClient();
            _httpClient.Timeout = TimeSpan.FromSeconds(3);
            _httpClient.BaseAddress = new Uri(hostName);
            _currentProduct = currentProduct;
        }

        public async Task TraceAsync(string message, string user = null)
        {
            await TraceAsync(message, user, null, null);
        }

        public async Task TraceAsync(string message, string user, long? ticks, long? sessionId, string tag1 = null, string tag2 = null, string tag3 = null)
        {
            Func<Task> func = async () =>
            {
                Trace newTrace = new()
                {
                    Product = _currentProduct,
                    Message = message,
                    Username = user,
                    Ticks = ticks,
                    SessionId = sessionId,
                    Tag1 = tag1,
                    Tag2 = tag2,
                    Tag3 = tag3,
                };

                string json = JsonSerializer.Serialize(newTrace);
                var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
                await _httpClient.PostAsync("/api/Trace", stringContent).ConfigureAwait(false);
            };


            // This method from the base class knows better how to execute logging.
            await PerformActionAsync(func);
        }

        public async Task<string> GenerateJavaScriptTracerObjectAsync(Product product)
        {
            var assembly = Assembly.GetExecutingAssembly();
            string javaScriptResource = "LogClient.WebTracer.js";
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
    }
}