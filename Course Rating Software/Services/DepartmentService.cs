using Microsoft.EntityFrameworkCore;
using Models;
using System.Text.Json;

namespace Services
{
    public class DepartmentService
    {
        private readonly CourseContext _context;
        private readonly ILogger<DepartmentService> _logger;

        public DepartmentService(CourseContext context, ILogger<DepartmentService> logger)
        {
            _context = context;
            _logger = logger;

            InitializeDepartments();
        }

        private void InitializeDepartments()
        {
            if (!_context.Departments.Any())
            {
                _logger.LogInformation("Initializing departments from JSON file.");
                var jsonData = File.ReadAllText("services/department_dummy_data.json");
                var departments = JsonSerializer.Deserialize<List<Department>>(jsonData);
                if (departments != null)
                {
                    _logger.LogInformation($"Read JSON data: {jsonData}");
                    _context.Departments.AddRange(departments);
                    _context.SaveChanges();
                }
            }
        }

        public List<Department> GetAll() => _context.Departments.Include(d => d.Courses).ToList();
        public Department? Get(int id) => _context.Departments.Include(d => d.Courses).FirstOrDefault(d => d.Id == id);

        public void Add(Department department)
        {
            department.Id = _context.Departments.Any() ? _context.Departments.Max(d => d.Id) + 1 : 1;
            _context.Departments.Add(department);
            _context.SaveChanges();
        }

        public void Update(Department department)
        {
            var existingDepartment = _context.Departments.Find(department.Id);
            if (existingDepartment != null)
            {
                _context.Entry(existingDepartment).CurrentValues.SetValues(department);
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var department = _context.Departments.Find(id);
            if (department != null)
            {
                _context.Departments.Remove(department);
                _context.SaveChanges();
            }
        }
    }
}
