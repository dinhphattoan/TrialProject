using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Model;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthenticationsController : ControllerBase
    {
        private readonly ClientOrderDbContext _context;
        private readonly ILogger<UserAuthenticationsController> _logger;
        public UserAuthenticationsController(ClientOrderDbContext context, ILogger<UserAuthenticationsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("signin")]
        public virtual async Task<ActionResult<UserAuthentication>> SignIn(string username, string password)
        {
            var userAuthentication = await _context.UserAuthentication.FirstOrDefaultAsync(p => p.Username == username && p.Password == password);
            if (userAuthentication is null)
            {
                return NotFound();
            }
            return userAuthentication;
        }

    }
}
