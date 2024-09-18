namespace LogAPI.DTOs
{
    public class PageDto<T>
    {
        public T[] Rows { get; set; }

        public int Total { get; set; }
    }
}