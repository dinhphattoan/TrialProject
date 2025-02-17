using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using ReactApp1.Server.Model.DTO;
using ReactApp1.Server.Data;
using Microsoft.EntityFrameworkCore;
namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ClientOrderDbContext _clientOrderDbContext;
        private readonly ILogger<AccountController> _logger;
        private readonly bool _IS_PASSWORD_PERSISTEN = true;
        public AccountController(ClientOrderDbContext clientOrderDbContext, SignInManager<IdentityUser> signInManager, ILogger<AccountController> logger)
        {
            _signInManager = signInManager;
            _logger = logger;
            _clientOrderDbContext = clientOrderDbContext;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] IdentityUserLoginDTO identityUserDTO)
        {
            if (ModelState.IsValid)
            {
                IdentityUser? identityUser = _clientOrderDbContext.Users.FindAsync(_clientOrderDbContext.Users.Where(user => user.UserName == identityUserDTO.Username).FirstOrDefault().Id).Result;
                if (identityUser is not null)
                {
                    var identityResult = await _signInManager.PasswordSignInAsync(identityUser, identityUserDTO.Password, _IS_PASSWORD_PERSISTEN, false);
                    if (identityResult.Succeeded)
                    {
                        return Ok(identityUser);
                    }
                    else
                    {
                        return BadRequest("Incorrect username or password");
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] IdentityUserRegisterDTO identityUserDTO)
        {
            if (ModelState.IsValid)
            {
                IdentityUser identityUser = new() { Email = identityUserDTO.Email, UserName = identityUserDTO.Username, };
                IdentityResult? result = await _signInManager.UserManager.CreateAsync(identityUser, identityUserDTO.Password);
                _logger.Log(LogLevel.Information, identityUser.Email);
                if (result.Succeeded)
                {
                    return Ok(result);
                }
                else
                {
                    List<string> errors = new List<string>();
                    foreach (var error in result.Errors)
                    {
                        errors.Add(error.Description);
                    }
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetAllAccount")]
        public async Task<IActionResult> GetAllAccount()
        {
            try
            {
                List<IdentityUser> identityUsers = await _clientOrderDbContext.Users.ToListAsync();
                List<IdentityUserDTO> identityUserDTOs = identityUsers.Select(account =>
                new IdentityUserDTO()
                {
                    Username = account.UserName,
                    Email = account.Email
                }).ToList();
                return Ok(identityUserDTOs);

            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error getting all account in account controller GetAllAccount");
                return StatusCode(500, "An error occurred while retrieving account.");
            }
        }
    }
}
