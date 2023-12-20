using System.ComponentModel;

namespace Hotel.DataAccess.Enums
{
    public enum enumRole
    {
        [Description("User")]
        User,

        [Description("Manager")]
        Manager,

        [Description("Admin")]
        Admin
    }
}
