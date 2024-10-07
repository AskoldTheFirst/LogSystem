using Microsoft.AspNetCore.Mvc;
using LogAPI.Database;
using LogAPI.DTOs;
using LogAPI.Database.Entities;
using Microsoft.EntityFrameworkCore;
using LogAPI.Types;
using Microsoft.AspNetCore.Authorization;
using LogClient;
using LogClient.Types;

namespace LogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppController
    {
        LogClient.ILogger _logger;

        ITracer _tracer;

        public AppController(LogClient.ILogger logger, ITracer tracer)
        {
            _logger = logger;
            _tracer = tracer;
        }

        [HttpGet("logger")]
        public async Task<ActionResult<string>> GetLoggerAsync()
        {
            return await _logger.GenerateJavaScriptLoggerObjectAsync(LogClient.Types.Product.LogSystem);
        }

        [HttpGet("tracer")]
        public async Task<ActionResult<string>> GetTracerAsync()
        {
            return await _tracer.GenerateJavaScriptTracerObjectAsync(LogClient.Types.Product.LogSystem);
        }
    }
}