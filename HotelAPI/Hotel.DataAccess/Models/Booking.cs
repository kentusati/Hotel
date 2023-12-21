using Hotel.DataAccess.Models.Base;

namespace Hotel.DataAccess.Models
{
    public class Booking : BaseEntity
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }

        public User User { get; set; }
        public Room Room { get; set; }
    }
}
