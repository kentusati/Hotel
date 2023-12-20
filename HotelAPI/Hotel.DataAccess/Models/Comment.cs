using Hotel.DataAccess.Models.Base;

namespace Hotel.DataAccess.Models
{
    public class Comment : BaseEntity
    {
        public string text { get; set; }
        public int rating { get; set; }

        public User User { get; set; }
    }
}
