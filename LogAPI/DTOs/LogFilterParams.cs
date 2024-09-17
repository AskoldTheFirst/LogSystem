using LogAPI.Types;

namespace LogAPI.DTOs
{
    public class LogFilterParams : FilterParamsBase
    {
        public Severity Severity { get; set; }

        public LayerType LayerType { get; set; }

    }
}
