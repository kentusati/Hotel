using Hotel.DataAccess.Models.Base;

namespace Hotel.DataAccess.Models
{
    public class Order : BaseEntity
    {
        public DateTime DateOfOrder { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }

        public List<SelectedServiceForOrder> SelectedServiceForOrder { get; set; }
        public Room Room { get; set; }
    }
}
