using System;
using System.Collections.Generic;

namespace BSynchro_RJP_API.Models
{
    public partial class Transaction
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public virtual User User { get; set; }
    }
}
