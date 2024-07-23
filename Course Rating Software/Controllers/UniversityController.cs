using Models;
using Services;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UniversityController : ControllerBase
    {
        private readonly UniversityService _universityService;

        public UniversityController(UniversityService universityService)
        {
            _universityService = universityService;
        }

        [HttpGet]
        public ActionResult<List<University>> Get() => _universityService.GetAll();

        [HttpGet("{id}")]
        public ActionResult<University> Get(int id)
        {
            var university = _universityService.Get(id);
            if (university == null) return NotFound();

            return university;
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, University university)
        {
            if (id != university.Id) return BadRequest();
            var existingUniversity = _universityService.Get(id);
            if (existingUniversity == null) return NotFound();

            _universityService.Update(university);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Create(University university)
        {
            _universityService.Add(university);
            return CreatedAtAction(nameof(Get), new { id = university.Id }, university);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var university = _universityService.Get(id);
            if (university == null) return NotFound();

            _universityService.Delete(id);
            return NoContent();
        }
    }
}
