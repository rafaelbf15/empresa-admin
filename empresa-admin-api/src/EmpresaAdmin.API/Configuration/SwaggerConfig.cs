﻿using Asp.Versioning.ApiExplorer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Linq;
using EmpresaAdmin.Core.Helpers;

namespace EmpresaAdmin.API.Configuration
{
    public static class SwaggerConfig
    {
        public static void AddSwaggerConfiguration(this IServiceCollection services, IHostEnvironment hostEnvironment)
        {
            var env = hostEnvironment.EnvironmentName;
          
            services.AddSwaggerGen(c =>
            {
                c.SchemaFilter<EnumSchemaFilter>();

                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "API",
                    Description = $"EmpresaAdmin API REST - {env} - Updated version:  {Utils.GetBrazilianDate().ToString("dd/MM/yyyy HH:mm:ss")}"
                });

                //Bearer token authentication
                OpenApiSecurityScheme securityDefinition = new OpenApiSecurityScheme()
                {
                    Name = "Bearer",
                    BearerFormat = "JWT",
                    Scheme = "bearer",
                    Description = "Specify the authorization token.",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                };

                c.AddSecurityDefinition("bearerAuth", securityDefinition);

                OpenApiSecurityScheme securityScheme = new OpenApiSecurityScheme()
                {
                    Reference = new OpenApiReference()
                    {
                        Id = "bearerAuth",
                        Type = ReferenceType.SecurityScheme
                    }
                };

                OpenApiSecurityRequirement securityRequirements = new OpenApiSecurityRequirement()
                {
                    {securityScheme, new string[] { }}
                };

                c.AddSecurityRequirement(securityRequirements);
            });
        }

        public static void UseSwaggerConfiguration(this IApplicationBuilder app, IApiVersionDescriptionProvider provider)
        {
            app.UseSwagger();
            app.UseSwaggerUI(
                 options =>
                 {
                     options.OAuthAppName("API");
                     foreach (var description in provider.ApiVersionDescriptions)
                     {
                         options.SwaggerEndpoint($"./{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                     }
                 });
        }

        public class EnumSchemaFilter : ISchemaFilter
        {
            public void Apply(OpenApiSchema model, SchemaFilterContext context)
            {
                if (context.Type.IsEnum)
                {
                    model.Enum.Clear();
                    Enum.GetNames(context.Type)
                        .ToList()
                        .ForEach(n => model.Enum.Add(new OpenApiString(n)));
                }
            }
        }
    }
}
