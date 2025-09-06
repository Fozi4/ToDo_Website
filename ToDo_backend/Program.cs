using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ToDo_backend.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add DbContext with SQL Server for user identity and task items
builder.Services.AddDbContext<UserDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnections")));
builder.Services.AddDbContext<TaskItemContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnections")));

// Add Identity 
builder.Services.AddIdentityApiEndpoints<AppUser>()
.AddEntityFrameworkStores<UserDbContext>();

builder.Services.AddDataProtection();
builder.Services.AddSingleton<TimeProvider>(TimeProvider.System);
builder.Services.Configure<IdentityOptions>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;
        //options.Password.RequireNonAlphanumeric = true;
        options.User.RequireUniqueEmail = true;
    });

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = 
    x.DefaultChallengeScheme = 
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(y =>
{
    y.SaveToken = false;
    y.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:JWT_Secret"]!))
    };
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
#region Config. Cors
app.UseCors(options => options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());
#endregion
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("/api")
    .MapIdentityApi<AppUser>();

app.MapPost("/api/signup", async ( UserManager<AppUser> userManager, 
    [FromBody] UserRegistrationModel userRegistrationModel) =>
{
    AppUser user = new AppUser
    {
        UserName = userRegistrationModel.Email,
        Email = userRegistrationModel.Email,
        name = userRegistrationModel.name
    };
    var result = await userManager.CreateAsync(user, userRegistrationModel.Password);
    if (result.Succeeded)
    {
        return Results.Ok(result);
    }
    else
    {
        return Results.BadRequest(result.Errors);
    }
});

app.MapPost("/api/signin", async ( UserManager<AppUser> userManager,
    [FromBody] LoginModel loginModel) =>
{
    var user = await userManager.FindByEmailAsync(loginModel.Email);
    if (user != null && await userManager.CheckPasswordAsync(user, loginModel.Password))
    {
        var signInKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:JWT_Secret"]!));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim("UserID", user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(10),
            SigningCredentials = new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(securityToken);
        return Results.Ok(new {token, name = user.name});
    }
    else 
    {
        return Results.BadRequest(new { Message = "Email or password is incorrect" });
    }
});
app.Run();

public class UserRegistrationModel
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string name { get; set; } = string.Empty;
}

public class LoginModel
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}