using LogAPI;
using System.Text;
using LogAPI.Database;
using LogAPI.Services;
using LogAPI.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connectionString = null;
#if DEBUG
    connectionString = builder.Configuration.GetConnectionString("DevelopmentDbConnection");
#else
    connectionString = builder.Configuration.GetConnectionString("ProductionDbConnection");
#endif

builder.Services.AddDbContext<LogDbContext>(opt =>
{
    opt.UseSqlServer(connectionString);
});

builder.Services.AddCors();
builder.Services.AddIdentityCore<User>(opt =>
    {
        opt.Password.RequireUppercase = false;
        opt.Password.RequiredLength = 2;
        opt.Password.RequireLowercase = false;
        opt.User.RequireUniqueEmail = true;
        opt.Password.RequireDigit = false;
        opt.Password.RequireNonAlphanumeric = false;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<LogDbContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithOrigins([
            "http://localhost:3006",
            "http://127.0.0.1:3006",
            "http://localhost:3004",
            "http://127.0.0.1:3004",
            "http://askold-001-site2.atempurl.com",
            "http://askold-001-site3.atempurl.com",
        ]);
});

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<LogDbContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await DbInitializer.InitializeAsync(userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occurred during migrations.");
}

app.Run();
