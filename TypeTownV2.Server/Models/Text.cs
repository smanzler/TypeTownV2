using System.ComponentModel.DataAnnotations;

namespace TypeTown.Models
{
    public class Text
    {
        [Key]
        public int ID { get; set; }
        public string TextContent { get; set; } = string.Empty;
        public int Difficulty { get; set; } = 0;
        public string Name { get; set; }
    }
}
