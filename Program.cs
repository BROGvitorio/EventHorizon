/*
    CURRENT:
        - Estrutura de camadas p herança TPT Owners, Person e Company

    TODO:
        -

    EXTRA:
        - hash nas senhas
        - uuid ao invés de ids sequenciais

 */

using EventHorizon_API.Data;
using EventHorizon_API.Repositories;
using EventHorizon_API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
// dotnet ef migrations add
// dotnet ef migrations remove
// dotnet ef database update

builder.Services.AddScoped<IBankAccountRepository, BankAccountRepository>();
builder.Services.AddScoped<IBankAccountService, BankAccountService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IOwnerRepository, OwnerRepository>();
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI( c =>
        {
            c.DocumentTitle = "Event Horizon API";
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Event Horizon API");
        }    
    );
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
