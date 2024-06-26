﻿using Hotel.DataAccess.Models.Base;
using System.Text.Json.Serialization;

namespace Hotel.DataAccess.Models
{
    public class Service : BaseEntity
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string ImgName { get; set; }

        [JsonIgnore]
        public List<Order> Orders { get; set; }
    }
}
