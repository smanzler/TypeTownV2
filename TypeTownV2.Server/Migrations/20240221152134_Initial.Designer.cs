﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TypeTown.Models;

#nullable disable

namespace TypeTownV2.Server.Migrations
{
    [DbContext(typeof(TextContext))]
    [Migration("20240221152134_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TypeTown.Models.Text", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Difficulty")
                        .HasColumnType("int");

                    b.Property<string>("TextContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Levels");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Difficulty = 3,
                            TextContent = "Penguins are a group of aquatic flightless birds from the family Spheniscidae of the order Sphenisciformes. They live almost exclusively in the Southern Hemisphere: only one species, the Galapagos penguin, is found north of the Equator."
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
