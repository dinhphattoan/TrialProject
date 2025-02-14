using ReactApp1.Server.Attributes;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Model
{
    public class UserAuthentication
    {
        [Key]
        public int Id { get; set; }

        public required string Username { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [StringLength(100,MinimumLength =10, ErrorMessage ="Password must be at least 10 characters long")]
        [PasswordComplexity]
        public required string Password { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        
        public User User { get; }

        public UserAuthentication() { }

        public UserAuthentication(int id, string username, string password, DateTime dateCreated, User user)
        {
            Id = id;
            Username = username;
            Password = password;
            DateCreated = dateCreated;
            User = user;
        }

    }
}
