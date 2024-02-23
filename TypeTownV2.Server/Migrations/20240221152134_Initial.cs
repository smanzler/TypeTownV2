using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TypeTownV2.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Levels",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TextContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Difficulty = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Levels", x => x.ID);
                });

            migrationBuilder.InsertData(
                table: "Levels",
                columns: new[] { "ID", "Difficulty", "TextContent" },
                values: new object[] { 1, 3, "Penguins are a group of aquatic flightless birds from the family Spheniscidae of the order Sphenisciformes. They live almost exclusively in the Southern Hemisphere: only one species, the Galapagos penguin, is found north of the Equator." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Levels");
        }
    }
}
