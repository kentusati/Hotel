using Hotel.DataAccess.Models.Base;

namespace Hotel.DataAccess.Models
{
    public class Service : BaseEntity
    {
        public string Name { get; set; }
        public string Img { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        
        public List<SelectedServiceForOrder> SelectedServiceForOrder { get; set; }
    }
}
