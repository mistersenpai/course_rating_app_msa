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
};