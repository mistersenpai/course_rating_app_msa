using Models;
using Services;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("[controller]")]

public class CourseController : ControllerBase{

    //HTTP action to get all courses from service
    [HttpGet]
    public ActionResult<List<Course>> Get() => CourseService.GetAll();

    //HTTP action to get unique course
    [HttpGet("{id}")]
    public ActionResult<Course> Get(int id){
        var course = CourseService.Get(id);

        if(course is null) return NotFound();

        return course;
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Course course) {
        // check if id matches the new course
        if (id != course.Id) return BadRequest();

        //check if exists
        var existingCourse = CourseService.Get(id);

        if(existingCourse is null) return NotFound();

        CourseService.Update(course);

        return NoContent();

    }
};