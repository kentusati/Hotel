using Hotel.DataAccess.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Hotel.DataAccess.Models
{
    public class Booking : BaseEntity
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        [ForeignKey("Room")]
        public Guid RoomId { get; set; }
        public User User { get; set; }
        public Room Room { get; set; }
    }
}
