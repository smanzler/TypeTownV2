using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace TypeTown.Models
{
    public class TextContext : DbContext
    {
        public TextContext(DbContextOptions<TextContext> options) : base(options) { }
        public DbSet<Text> Levels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Text>().HasData(
                new Text { ID = 1, TextContent = "Penguins are a group of aquatic flightless birds from the family Spheniscidae of the order Sphenisciformes. They live almost exclusively in the Southern Hemisphere: only one species, the Galapagos penguin, is found north of the Equator.", Difficulty = 3 }
            );
        }
    }
}
