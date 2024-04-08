using Hotel.DataAccess.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Hotel.DataAccess.Models
{
    public class Order : BaseEntity
    {
        public string DateOfOrder { get; set; }
        public bool Status { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        [ForeignKey("Service")]
        public Guid ServiceId { get; set; }

        [JsonIgnore]
        public Service Service { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
