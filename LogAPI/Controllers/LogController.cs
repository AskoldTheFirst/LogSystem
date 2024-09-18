using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LogAPI.Database;
using LogAPI.DTOs;
using LogAPI.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace LogAPI.Controllers
{
    public class LogController : BaseApiController
    {
        public LogController(LogDbContext logDbContext) : base(logDbContext)
        {
        }

        [HttpGet]
        public async Task<ActionResult<PageDto<LogDto>>> Logs([FromQuery] LogFilterParams param)
        {
            var query = _ctx.Logs;

            if (param.LayerType != Types.LayerType.All)
            {
                query.Where(x => x.LayerType == param.LayerType);
            }

            if (param.Severity != Types.Severity.All)
            {
                query.Where(x => x.Severity == param.Severity);
            }

            if (param.Product != Types.Product.All)
            {
                query.Where(x => (x.ProductId & param.Product) != 0);
            }

            if (!String.IsNullOrEmpty(param.MessageSearchTerm))
            {
                query.Where(x => x.Message.Contains(param.MessageSearchTerm));
            }

            if (!String.IsNullOrEmpty(param.UserSearchTerm))
            {
                query.Where(x => x.Username.Contains(param.UserSearchTerm));
            }

            int skipAmount = (param.PageNumber - 1) * param.PageSize;

            LogDto[] selectedRows = await (from l in query
                                           orderby l.LogDTServer descending
                                           select new LogDto(l))
                        .Skip(skipAmount)
                        .Take(param.PageSize).ToArrayAsync();

            int totalAmount = await (from l in query select l.Id).CountAsync();

            return new PageDto<LogDto>
            {
                Rows = selectedRows,
                Total = totalAmount
            };
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