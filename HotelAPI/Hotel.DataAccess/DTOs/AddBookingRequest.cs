
using Hotel.DataAccess.DTOs.UsersRequest;
using Hotel.DataAccess.Models;

namespace Hotel.DataAccess.DTOs
{
    public class AddBookingRequest
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string UserId { get; set; }
        public string RoomId { get; set; }

    }
}
