﻿namespace Hotel.DataAccess.DTOs
{
    public class AddOrderRequest
    {
        public DateTime DateOfOrder { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
    }
}
