using Hotel.DataAccess.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Hotel.DataAccess.Models
{
    public class Room : BaseEntity
    {
        public int RoomNumber { get; set; }
        public bool Available { get; set; }
        [ForeignKey("RoomType")]
        public Guid RoomTypeId { get; set; }
        [JsonIgnore]
        public RoomType? RoomType { get; set; }
    }
}
