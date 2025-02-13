using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ReactApp1.Server.Model
{
    public class Product
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string NameProduct { get; set; }
        public string DescriptionProduct { get; set; } = string.Empty;
        [DefaultValue(0f)]
        public float PriceProduct { get; set; }

        public Bill? Bill { get;}

        public Product(int id, string nameProduct, string descriptionProduct, float priceProduct)
        {
            Id = id;
            NameProduct = nameProduct;
            DescriptionProduct = descriptionProduct;
            PriceProduct = priceProduct;
        }
    }
}
