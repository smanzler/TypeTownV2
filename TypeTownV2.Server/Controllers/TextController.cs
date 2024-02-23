using Microsoft.AspNetCore.Mvc;
using TypeTown.Models;

namespace TypeTownV2.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TextController : Controller
    {

        private readonly TextContext _context;

        public TextController(TextContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public Text Get(int id)
        {
            var text = _context.Levels.Find(id);
            return text;
        }
    }
}
