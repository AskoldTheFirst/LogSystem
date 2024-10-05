using Microsoft.AspNetCore.Mvc;
using LogAPI.Database;
using LogAPI.DTOs;
using LogAPI.Database.Entities;
using Microsoft.EntityFrameworkCore;
using LogAPI.Types;
using Microsoft.AspNetCore.Authorization;

namespace LogAPI.Controllers
{
    public class LogController : BaseApiController
    {
        public LogController(LogDbContext logDbContext) : base(logDbContext)
        {
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<PageDto<LogDto>>> Logs([FromQuery] LogFilterParams param)
        {
            var query = _ctx.Logs.AsQueryable();
            query = ApplyFilterWhere(query, param);
            
            int skipAmount = (param.PageNumber - 1) * param.PageSize;

            LogDto[] selectedRows = await (from q in query orderby q.dtServer descending select new LogDto(q))
                        .Skip(skipAmount)
                        .Take(param.PageSize).ToArrayAsync();

            int totalAmount = await (from l in query select l).CountAsync();

            return new PageDto<LogDto>
            {
                Rows = selectedRows,
                Total = totalAmount
            };
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> WriteLog(LogDto log)
        {
            _ctx.Logs.Add(log.ToDbEntity());
            await _ctx.SaveChangesAsync();
            return Ok();
        }

        public static IQueryable<Log> ApplyFilterWhere(IQueryable<Log> query, LogFilterParams param)
        {
            if (param.LayerType != LayerType.All)
            {
                query = query.Where(x => x.LayerType == param.LayerType);
            }

            if (param.Severity != Severity.All)
            {
                query = query.Where(x => x.Severity == param.Severity);
            }

            if (param.Product != Product.All)
            {
                query = query.Where(x => x.ProductId == param.Product);
            }

            if (!String.IsNullOrEmpty(param.MessageSearchTerm))
            {
                query = query.Where(x => x.Message.Contains(param.MessageSearchTerm));
            }

            if (!String.IsNullOrEmpty(param.UserSearchTerm))
            {
                query = query.Where(x => x.Username.Contains(param.UserSearchTerm));
            }

            return query;
        }
    }
}