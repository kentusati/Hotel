
using Hotel.DataAccess.Models;

namespace Hotel.DataAccess.DTOs
{
    public class AddBookingRequest
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }

        public Room room { get; set; }
        public User user { get; set; }
    }
}
