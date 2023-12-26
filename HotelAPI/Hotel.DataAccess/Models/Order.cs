using Hotel.DataAccess.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Hotel.DataAccess.Models
{
    public class Order : BaseEntity
    {
        public string DateOfOrder { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
        [ForeignKey("Room")]
        public Guid RoomId { get; set; }
        [ForeignKey("Service")]
        public Guid ServiceId { get; set; }

        [JsonIgnore]
        public Service Service { get; set; }
        [JsonIgnore]
        public Room Room { get; set; }
    }
}
