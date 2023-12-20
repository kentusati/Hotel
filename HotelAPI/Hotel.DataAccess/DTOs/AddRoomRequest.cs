namespace Hotel.DataAccess.DTOs
{
    public class AddRoomRequest
    {
        public string Name { get; set; }
        public string Number { get; set; }
        public string Type { get; set; }
        public string Img { get; set; }
        public double Price_day { get; set; }
        public bool Available { get; set; }
        public string Description { get; set; }
    }
}
