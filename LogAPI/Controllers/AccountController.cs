using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using LogAPI.Controllers;
using LogAPI.Database;
using Microsoft.AspNetCore.Identity;
using LogAPI.Services;
using LogAPI.Database.Entities;
using LogAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using LogClient;
using LogClient.Types;

namespace LogAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly LogClient.ILogger _logger;

        private readonly LogClient.ITracer _tracer;

        private readonly UserManager<User> _userManager;

        private readonly TokenService _tokenService;

        public AccountController(LogDbContext logDbContext, LogClient.ILogger logger, LogClient.ITracer tracer,
            UserManager<User> userManager, TokenService tokenService) : base(logDbContext)
        {
            _logger = logger;
            _tracer = tracer;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateTokenAsync(user),
                Login = user.UserName
            };
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateTokenAsync(user),
                Login = user.UserName
            };
        }
    }
}