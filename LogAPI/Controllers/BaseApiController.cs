using Microsoft.AspNetCore.Mvc;
using LogAPI.Database;

namespace LogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected readonly LogDbContext _ctx;

        public BaseApiController(LogDbContext logDbContext)
        {
            _ctx = logDbContext;
        }
    }
}