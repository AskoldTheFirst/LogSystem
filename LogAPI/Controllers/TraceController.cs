using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LogAPI.Database;
using LogAPI.DTOs;

namespace LogAPI.Controllers
{
    public class TraceController : BaseApiController
    {
        public TraceController(LogDbContext logDbContext) : base(logDbContext)
        {
        }

        [HttpGet]
        public async Task<ActionResult<TraceDto[]>> Traces(TraceFilterParams param)
        {
            return new TraceDto[0];
        }

        //[HttpPost]
        //public async Task<ActionResult> WriteLog(TraceDto trace)
        //{
        //    _ctx.Logs.Add(log.ToDbEntity());
        //    await _ctx.SaveChangesAsync();
        //    return Ok();
        //}
    }
}