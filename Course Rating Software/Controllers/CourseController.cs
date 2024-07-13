using Models;
using Services;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class CourseController : ControllerBase
{
    private readonly CourseService _courseService;

    public CourseController(CourseService courseService)
    {
        _courseService = courseService;
    }

    // HTTP action to get all courses from service
    [HttpGet]
    public ActionResult<List<Course>> Get() => _courseService.GetAll();

    // HTTP action to get unique course
    [HttpGet("{id}")]
    public ActionResult<Course> Get(int id)
    {
        var course = _courseService.Get(id);

        if (course is null) return NotFound();

        return course;
    }

    // HTTP action to update course
    [HttpPut("{id}")]
    public IActionResult Update(int id, Course course)
    {
        // check if id matches the new course
        if (id != course.Id) return BadRequest();

        // check if exists
        var existingCourse = _courseService.Get(id);
        if (existingCourse is null) return NotFound();

        _courseService.Update(course);

        return NoContent();
    }

    // HTTP action to create new course
    [HttpPost]
    public IActionResult Create(Course course)
    {
        _courseService.Add(course);

        return CreatedAtAction(nameof(Get), new { Id = course.Id }, course);
    }

    // HTTP action to delete existing course
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        // check if course exists
        var course = _courseService.Get(id);
        if (course is null) return NotFound();

        _courseService.Delete(id);

        return NoContent();
    }
}
