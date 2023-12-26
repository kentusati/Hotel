using Hotel.DataAccess.Models.Base;
using System.Text.Json.Serialization;

namespace Hotel.DataAccess.Models
{
    public class Comment : BaseEntity
    {
        public string text { get; set; }
        public int rating { get; set; }
        public Guid UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
