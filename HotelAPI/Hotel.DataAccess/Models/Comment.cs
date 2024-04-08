using Hotel.DataAccess.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Hotel.DataAccess.Models
{
    public class Comment : BaseEntity
    {
        public string text { get; set; }
        public int rating { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
