using Hotel.DataAccess.Models.Base;

namespace Hotel.DataAccess.Models
{
    public class Booking : BaseEntity
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public User User { get; set; }
        public Room Room { get; set; }
    }
}
