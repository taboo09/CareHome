using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CareHomeAPI.Models
{
    public class Home
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int Rating { get; set; }
        public ICollection<Staff> Staffs { get; set; }
    }
}