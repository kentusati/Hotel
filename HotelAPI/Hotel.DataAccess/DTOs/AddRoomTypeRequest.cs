using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.DataAccess.DTOs
{
    public class AddRoomTypeRequest
    {
        public string Type { get; set; }
        public double Price_day { get; set; }
        public string Description { get; set; }
    }
}
