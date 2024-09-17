using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logger
{
    public interface ILogger
    {
        Task LogAsync();

        Task TraceAsync();

        void WriteTraceToMemoryBuffer();

        Task FlushTraceMemoryBufferAsync();

        string GenerateJavaScriptLoggerObject();
    }
}
