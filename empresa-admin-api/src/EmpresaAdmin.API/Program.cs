using Asp.Versioning.ApiExplorer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using Serilog;
using EmpresaAdmin.API.Configuration;
using EmpresaAdmin.Infra.Context;
using Microsoft.EntityFrameworkCore;
using EmpresaAdmin.API.Data;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/empresa-admin.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddApiConfiguration(builder.Configuration);

builder.Services.AddIdentityConfiguration(builder.Configuration);

builder.Services.RegisterServices();

builder.Services.AddSwaggerConfiguration(builder.Environment);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var applicationDbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var funcionarioDbContext = scope.ServiceProvider.GetRequiredService<FuncionarioDbContext>();

    applicationDbContext.Database.Migrate();

    funcionarioDbContext.Database.Migrate();
}

var apiVersionDescriptionProvider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();

app.UseDeveloperExceptionPage();

app.UseSwaggerConfiguration(apiVersionDescriptionProvider);

app.UseApiConfiguration(app.Environment, builder.Configuration);

app.Run();

public partial class Program { }

