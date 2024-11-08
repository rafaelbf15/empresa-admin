using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Diagnostics;
using System.Threading;
using System.IO;

namespace EmpresaAdmin.API.Middleware
{
    internal sealed class ErrorHandlingMiddleware : IExceptionHandler
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        private readonly string _logFilePath = "logs/exceptions.txt";

        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(
                exception, "Exception occurred: {Message}", exception.Message);

            await LogToFileAsync(exception);

            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "Server error"
            };

            httpContext.Response.StatusCode = problemDetails.Status.Value;

            await httpContext.Response
                .WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }

        private async Task LogToFileAsync(Exception exception)
        {
            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_logFilePath) ?? throw new InvalidOperationException());

                var logEntry = $"[{DateTime.Now}] Exception: {exception.Message}{Environment.NewLine}" +
                               $"Stack Trace: {exception.StackTrace}{Environment.NewLine}";

                await File.AppendAllTextAsync(_logFilePath, logEntry);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to write exception to log file.");
            }
        }
    }

}
