using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareHomeAPI.Models
{
    public class Staff
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Forename { get; set; }

        [Required]
        [StringLength(255)]
        public string Surname { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        public string JobTitle { get; set; }

        [Column(TypeName="money")]
        public decimal AnnualSalary { get; set; }
        public int HomeId { get; set; }
        public Home Home { get; set; }
        public ICollection<Qualification> Qualifications { get; set; }
    }
}