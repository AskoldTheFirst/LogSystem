using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LogClient
{
    public interface ITracer
    {
        Task TraceAsync();

        void WriteTraceToMemoryBuffer();

        Task FlushTraceMemoryBufferAsync();
    }
}
