using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using ReactApp1.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using ReactApp1.Server.DTO;
namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController(ClientOrderDbContext clientOrderDbContext, SignInManager<IdentityUser> signInManager, ILogger<AccountsController> logger, UserManager<IdentityUser> userManager) : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager = signInManager;
        private readonly ClientOrderDbContext _clientOrderDbContext = clientOrderDbContext;
        private readonly UserManager<IdentityUser> _userManager = userManager;
        private readonly ILogger<AccountsController> _logger = logger;
        private readonly bool IS_PASSWORD_PERSISTENT = true;

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginAccountAsync([FromBody] IdentityUserLoginDTO identityUserDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid request data." });
            }

            var identityUserFind = await _userManager.Users
                .FirstOrDefaultAsync(p => p.UserName == identityUserDTO.Username);

            if (identityUserFind == null)
            {
                return Unauthorized(new { Message = "Invalid username or password." });
            }

            var signInResult = await _signInManager.PasswordSignInAsync(identityUserFind, identityUserDTO.Password, IS_PASSWORD_PERSISTENT, lockoutOnFailure: true);

            if (signInResult.Succeeded)
            {
                return Ok(new { Message = "Signed in successfully." });
            }
            else if (signInResult.IsLockedOut)
            {
                return Unauthorized(new { Message = "Your account is locked. Please try again later." });
            }
            else if (signInResult.RequiresTwoFactor)
            {
                return Unauthorized(new { Message = "Two-factor authentication is required." });
            }

            return Unauthorized(new { Message = "Invalid username or password." });
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> LogoutAccountAsync()
        {
            if (User.Identities == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { Message = "No user is currently logged in." });
            }

            string loggedInUsername = User.Identity?.Name ?? "Unknown User";

            try
            {
                await _signInManager.SignOutAsync();
                _logger.LogInformation($"User {loggedInUsername} logged out successfully.");
                return Ok(new { Message = "Logged out successfully!" });
            }
            catch (InvalidOperationException e)
            {
                _logger.LogError($"Logout failed for user {loggedInUsername}: {e.Message}");
                return StatusCode(500, new { Message = "An error occurred while logging out." });
            }
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterAccountAsync([FromBody] IdentityUserRegisterDTO identityUserDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid request data." });
            }
            IdentityUser? existedIdentityUser = await _userManager.Users.FirstOrDefaultAsync(p => p.UserName == identityUserDTO.Username);
            if (existedIdentityUser is not null)
            {
                return BadRequest(new { Message = "Username already exists." });
            }

            IdentityUser registerIdentityUser = new() { Email = identityUserDTO.Email, UserName = identityUserDTO.Username, };
            IdentityResult? registerResult = await _signInManager.UserManager.CreateAsync(registerIdentityUser, identityUserDTO.Password);

            if (registerResult.Succeeded)
            {
                _logger.LogInformation($"New user {registerIdentityUser.UserName} registered with Email: {registerIdentityUser.Email}");
                return CreatedAtAction(nameof(RegisterAccountAsync),new {id = registerIdentityUser.Id}
                , new {Message = "User register successfully."});
            }

            List<string> errors = new List<string>();
            foreach (var error in registerResult.Errors)
            {
                errors.Add(error.Description);
            }
            _logger.LogError($"Failed to sign up with Username {registerIdentityUser.UserName}. Error:{string.Join(",", errors)}");
            return BadRequest(new {Message = "User registration failed", Errors = errors});
        }


        [HttpGet("GetAllAccounts")]
        [Authorize]
        public async Task<IActionResult> GetAllAccounts()
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
        //Restful
        [HttpGet("Account/{username}")]
        [Authorize]
        public async Task<IActionResult> GetEmailFromUsernameAsync(string username)
        {
            if(string.IsNullOrEmpty(username))
            {
                return BadRequest(new { Message = "Username cannot be empty" });
            }

            IdentityUser? identityUserFind = await _userManager.Users.FirstOrDefaultAsync(p => p.UserName == username);
            if(identityUserFind == null)
            {
                return BadRequest(new { Message = "Account doesn't exist." });
            }
            if(!identityUserFind.EmailConfirmed)
            {
                return Unauthorized(new { Message = "Account Email isn't authorized" });
            }
            return Ok(new { Username = username, Email = identityUserFind.Email});
        }
    }
}
