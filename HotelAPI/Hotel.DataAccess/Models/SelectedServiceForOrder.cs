using Hotel.DataAccess.Models.Base;

namespace Hotel.DataAccess.Models
{
    public class SelectedServiceForOrder : BaseEntity
    { 
        public Service Service { get; set; }
        public Order Order { get; set; }
    }
}
