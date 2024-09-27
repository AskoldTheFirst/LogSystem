using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LogAPI.Database;
using LogAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using LogAPI.Types;
using Microsoft.EntityFrameworkCore;

namespace LogAPI.Controllers
{
    public class TraceController : BaseApiController
    {
        public TraceController(LogDbContext logDbContext) : base(logDbContext)
        {
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<PageDto<TraceDto>>> Traces([FromQuery] FilterParamsBase param)
        {
            var query = _ctx.Traces.AsQueryable();
            query = ApplyFilterWhere(query, param);
            
            int skipAmount = (param.PageNumber - 1) * param.PageSize;

            TraceDto[] selectedRows = await (from q in query orderby q.Id descending select new TraceDto(q))
                        .Skip(skipAmount)
                        .Take(param.PageSize).ToArrayAsync();

            int totalAmount = await (from l in query select l).CountAsync();

            return new PageDto<TraceDto>
            {
                Rows = selectedRows,
                Total = totalAmount
            };
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> WriteTrace(TraceDto trace)
        {
            _ctx.Traces.Add(trace.ToDbEntity());
            await _ctx.SaveChangesAsync();
            return Ok();
        }

        public static IQueryable<Database.Entities.Trace> ApplyFilterWhere(IQueryable<Database.Entities.Trace> query, FilterParamsBase param)
        {
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