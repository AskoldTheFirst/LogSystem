using System.Diagnostics;
using LogClient;
using LogClient.Types;

namespace LoggerTestClient
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            //Stopwatch stopwatch = new Stopwatch();

            //Console.WriteLine(DateTime.Now.Ticks);

            //ILogger log = new WebLogger("http://localhost:5009/", Product.Tester, LayerType.BackEnd);
            ILogger log = new WebLogger("http://askold-001-site1.atempurl.com/", Product.Tester, LayerType.BackEnd);
            //await log.LogAsync("test msg", Severity.Middle, new ApplicationException("test exception"));
            string str = await log.GenerateJavaScriptLoggerObjectAsync(Product.FCS);
            Console.WriteLine(str);
        }
    }
}
