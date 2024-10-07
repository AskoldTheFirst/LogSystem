
namespace LogClient
{
    public class BaseLogger
    {
        private const int LoggingDelayAfterFaultInMinutes = 10;

        private DateTime? _lastFaultDate = null;

        private readonly object _syncObj = new object();

        private bool ShouldWeSkipLogging()
        {
            bool shouldWeSkip = false;

            lock (_syncObj)
            {
                if (_lastFaultDate.HasValue)
                {
                    if ((DateTime.Now - _lastFaultDate.Value).TotalMinutes < LoggingDelayAfterFaultInMinutes)
                        shouldWeSkip = true;
                    else
                        _lastFaultDate = null;
                }
            }

            return shouldWeSkip;
        }

        /* 
         * All logging methods should be executed through this method only.
         */
        protected async Task PerformActionAsync(Func<Task> actionAsync)
        {
            try
            {
                if (ShouldWeSkipLogging())
                    return;

                await actionAsync();
            }
            catch(Exception ex)
            {
                // we are swallowing any exceptions here.

                lock (_syncObj)
                {
                    _lastFaultDate = DateTime.Now;
                }

#if DEBUG
                Console.WriteLine(ex.Message);
#endif
            }
        }
    }
}
