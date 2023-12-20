
namespace Hotel.DataAccess.DTOs
{
    public class AddBookingRequest
    {
        public Guid Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

    }
}
