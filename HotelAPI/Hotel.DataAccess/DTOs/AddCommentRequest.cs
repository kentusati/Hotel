
namespace Hotel.DataAccess.DTOs
{
    public class AddCommentRequest
    {
        public string text { get; set; }
        public int rating { get; set; }
        public Guid UserId { get; set; }

    }
}
