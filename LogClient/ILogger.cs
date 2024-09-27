using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LogClient.Types;

namespace LogClient
{
    public interface ILogger
    {
        Task LogAsync(
            string message,
            Severity severity,
            Exception exception);

        Task LogAsync(
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
            string tag3 = null);

        string GenerateJavaScriptLoggerObject();
    }
}
