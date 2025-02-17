using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Model;

namespace ReactApp1.Server.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion(1)]
    [ApiVersion(2)]
    [Route("[controller]/api/v{version:apiVersion}")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        [MapToApiVersion(1)]
        [Authorize (Roles = "User")]
        public IEnumerable<WeatherForecast> GetAllWeatherForecastsAsync()
        {
            var requestedVersion = HttpContext.GetRequestedApiVersion();
            _logger.LogInformation($"Requested API Version: {requestedVersion}"); // Log the version
            
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            }).ToArray();
        }
    }
}
