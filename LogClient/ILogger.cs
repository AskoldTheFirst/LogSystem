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

        Task<string> GenerateJavaScriptLoggerObjectAsync(Product product);
    }
}
