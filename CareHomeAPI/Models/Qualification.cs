using System;
using System.ComponentModel.DataAnnotations;

namespace CareHomeAPI.Models
{
    public class Qualification
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Type { get; set; }
        public double Grade { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        public int StaffId { get; set; }
        public Staff Staff { get; set; }
    }
}