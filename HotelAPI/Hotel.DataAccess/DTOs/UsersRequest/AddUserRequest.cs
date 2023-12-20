using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Hotel.DataAccess.DTOs.UsersRequest
{
    public class AddUserRequest
    {
        [Required]
        public string UserName { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
