
using System.Text;
using System.Text.Json;
using LogClient.Types;

namespace LogClient
{
    public sealed class WebTracer : ITracer
    {
        readonly HttpClient _httpClient;

        readonly Product _currentProduct;


        public WebTracer(string hostName, Product currentProduct)
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri(hostName);
            _currentProduct = currentProduct;
        }

        public async Task TraceAsync(string message, string user = null)
        {
            await TraceAsync(message, user, null, null);
        }

        public async Task TraceAsync(string message, string user, long? ticks, long? sessionId, string tag1 = null, string tag2 = null, string tag3 = null)
        {
            try
            {
                Trace newTrace = new()
                {
                    Product = _currentProduct,
                    Message = message,
                    Username = user,
                    Date = DateTime.UtcNow.ToString(),
                    Ticks = ticks,
                    SessionId = sessionId,
                    Tag1 = tag1,
                    Tag2 = tag2,
                    Tag3 = tag3,
                };

                string json = JsonSerializer.Serialize(newTrace);
                var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
                await _httpClient.PostAsync("/api/Traces", stringContent).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                // just to swallow the exception.

                #if DEBUG
                    Console.WriteLine(ex.Message);
                #endif
            }
        }
    }
}