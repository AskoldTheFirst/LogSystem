using LogAPI.Types;

namespace LogAPI.DTOs
{
    public class FilterParamsBase
    {
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 30;

        public Product[] Products { get; set; }

        public string MessageSearchTerm { get; set; }

        public bool ShowMarkedOnly { get; set; }

        public Period Period { get; set; }
    }
}
