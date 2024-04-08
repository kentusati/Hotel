using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Hotel.DataAccess.Enums;
using Hotel.DataAccess.Models.Base;
using Microsoft.AspNetCore.Identity;

namespace Hotel.DataAccess.Models
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }    

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public bool isBlocked {  get; set; }

        public string? PasswordHash { get; set; }
        public Guid? roleId { get; set; }

        //---------------------------------------
        public Role? Role { get; set; }
        [JsonIgnore]
        public List<Booking>? Bookings { get; set; }
        [JsonIgnore]
        public List<Comment>? Comments { get; set; }
        [JsonIgnore]
        public List<Order>? Orders { get; set; }
    }
}
