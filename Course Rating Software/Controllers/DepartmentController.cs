using Models;
using Services;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly DepartmentService _departmentService;

    public DepartmentController(DepartmentService departmentService)
    {
        _departmentService = departmentService;
    }

    // HTTP action to get all departments from service
    [HttpGet]
    public ActionResult<List<Department>> Get() => _departmentService.GetAll();

    // HTTP action to get unique department
    [HttpGet("{id}")]
    public ActionResult<Department> Get(int id)
    {
        var department = _departmentService.Get(id);

        if (department is null) return NotFound();

        return department;
    }

    // HTTP action to update department
    [HttpPut("{id}")]
    public IActionResult Update(int id, Department department)
    {
        // check if id matches the new department
        if (id != department.Id) return BadRequest();

        // check if exists
        var existingDepartment = _departmentService.Get(id);
        if (existingDepartment is null) return NotFound();

        _departmentService.Update(department);

        return NoContent();
    }

    // HTTP action to create new department
    [HttpPost]
    public IActionResult Create(Department department)
    {
        _departmentService.Add(department);

        return CreatedAtAction(nameof(Get), new { Id = department.Id }, department);
    }

    // HTTP action to delete existing department
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        // check if department exists
        var department = _departmentService.Get(id);
        if (department is null) return NotFound();

        _departmentService.Delete(id);

        return NoContent();
    }
}
