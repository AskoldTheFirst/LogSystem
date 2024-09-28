
namespace LogClient
{
    public interface ITracer
    {
        Task TraceAsync(string message, string user = null);

        Task TraceAsync(string message, string user, long? ticks, long? sessionId, string tag1 = null, string tag2 = null, string tag3 = null);
    }
}
