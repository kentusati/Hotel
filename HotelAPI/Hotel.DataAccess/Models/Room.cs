using Hotel.DataAccess.Models.Base;

namespace Hotel.DataAccess.Models
{
    public class Room : BaseEntity
    {
        public string Number { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public string Type { get; set; }
        public double Price_day { get; set; }
        public bool Available { get; set; }
        public string Description { get; set; }

        public List<Booking> Bookings { get; set; }
        public List<Order> Orders { get; set; }
    }
}
