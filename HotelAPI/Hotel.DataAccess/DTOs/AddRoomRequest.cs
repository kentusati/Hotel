namespace Hotel.DataAccess.DTOs
{
    public class AddRoomRequest
    {
        public int RoomNumber { get; set; }
        public bool Available {  get; set; }
        public string RoomTypeId { get; set;}
    }
}
