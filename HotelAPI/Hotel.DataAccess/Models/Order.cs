using Hotel.DataAccess.Models.Base;

namespace Hotel.DataAccess.Models
{
    public class Order : BaseEntity
    {
        public string DateOfOrder { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
        public Guid RoomId { get; set; }
        public Guid ServiceId { get; set; }

        public Service Service { get; set; }
        public Room Room { get; set; }
    }
}
