using Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class DepartmentService
    {
        private readonly CourseContext _context;

        public DepartmentService(CourseContext context)
        {
            _context = context;

            // Populate database with JSON data if empty
            if (!_context.Departments.Any())
            {
                var jsonData = File.ReadAllText("services/department_dummy_data.json");
                var departments = JsonSerializer.Deserialize<List<Department>>(jsonData);
                if (departments != null)
                {
                    foreach (var department in departments)
                    {
                        // Detach any existing tracked entity with the same key
                        var trackedEntity = _context.Departments.Local.FirstOrDefault(d => d.Id == department.Id);
                        if (trackedEntity != null)
                        {
                            _context.Entry(trackedEntity).State = EntityState.Detached;
                        }
                        _context.Departments.Add(department);
                    }
                    _context.SaveChanges();
                }
            }
        }

        // gets all departments
        public List<Department> GetAll() => _context.Departments.ToList();

        // gets single department by Id
        public Department? Get(int id) => _context.Departments.Find(id);

        // update existing department
        public void Update(Department department)
        {
            var existingDepartment = _context.Departments.Find(department.Id);
            if (existingDepartment != null)
            {
                _context.Entry(existingDepartment).CurrentValues.SetValues(department);
                _context.SaveChanges();
            }
        }

        // add a new department
        public void Add(Department department)
        {
            department.Id = _context.Departments.Any() ? _context.Departments.Max(d => d.Id) + 1 : 1;
            _context.Departments.Add(department);
            _context.SaveChanges();
        }

        // delete department by id
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
