namespace Hotel.DataAccess.DTOs
{
    public class AddOrderRequest
    {
        public string DateOfOrder { get; set; }
        public bool Status { get; set; }
        public string UserId { get; set; }
        public string ServiceId { get; set; }
    }
}
