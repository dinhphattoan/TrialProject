using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Model
{
    public class Bill
    {
        [Key]
        public int Id { get; set; }
        [DefaultValue("")]
        public string BillDescription { get; set; } = String.Empty;

        [Required]
        public required User User { get; set; }
        public List<Product> Products { get; } =  new();
        public DateTime DateIssued { get; set; } = DateTime.Now;

        public Bill(int id, DateTime dateIssued)
        {
            Id = id;
            DateIssued = dateIssued;
        }
    }
}
