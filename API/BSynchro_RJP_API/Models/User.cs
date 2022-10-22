using System;
using System.Collections.Generic;

namespace BSynchro_RJP_API.Models
{
    public partial class User
    {
        public User()
        {
            Transaction = new HashSet<Transaction>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public decimal? Balance { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public virtual ICollection<Transaction> Transaction { get; set; }
    }
}
