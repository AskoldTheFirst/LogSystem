using System;
using System.Web;
using System.Net.Http;

namespace Logger
{
    public class Logger : ILogger
    {
        readonly HttpClient _httpClient;

        readonly bool _allowDirectConnectionToLogDb;

        public Logger(string logServerDomainName, bool allowDirectConnectionToLogDb = false)
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri(logServerDomainName);

            _allowDirectConnectionToLogDb = allowDirectConnectionToLogDb;
            if (_allowDirectConnectionToLogDb)
            {
                
            }
        }

        public async Task LogAsync()
        {
            // https://stackoverflow.com/questions/11145053/cant-find-how-to-use-httpcontent

            await _httpClient.PostAsync("",);

            throw new NotImplementedException();
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
            return "";
        }
    }
}
