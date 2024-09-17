using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LogAPI.Database;
using LogAPI.DTOs;
using LogAPI.Database.Entities;

namespace LogAPI.Controllers
{
    public class LogController : BaseApiController
    {
        public LogController(LogDbContext logDbContext) : base(logDbContext)
        {
        }

        [HttpGet]
        public async Task<ActionResult<LogDto[]>> Logs(LogFilterParams param)
        {
            return new LogDto[0];
        }

        [HttpPost]
        public async Task<ActionResult> WriteLog(LogDto log)
        {
            _ctx.Logs.Add(log.ToDbEntity());
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}