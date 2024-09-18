using LogAPI.Types;

namespace LogAPI.DTOs
{
    public class FilterParamsBase
    {
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 30;

        public Product Product { get; set; }

        public string MessageSearchTerm { get; set; }

        public string UserSearchTerm { get; set; }
    }
}
