using Microsoft.EntityFrameworkCore;
using Models;
using System.Text.Json;

namespace Services
{
    public class UniversityService
    {
        private readonly CourseContext _context;
        private readonly ILogger<UniversityService> _logger;

        public UniversityService(CourseContext context, ILogger<UniversityService> logger)
        {
            _context = context;
            _logger = logger;

            InitializeUniversities();
        }

        private void InitializeUniversities()
        {
            if (!_context.Universities.Any())
            {
                _logger.LogInformation("Initializing universities from JSON file.");
                var jsonData = File.ReadAllText("services/university_dummy_data.json");
                var universities = JsonSerializer.Deserialize<List<University>>(jsonData);
                if (universities != null)
                {
                    _logger.LogInformation($"Read JSON data: {jsonData}");
                    _context.Universities.AddRange(universities);
                    _context.SaveChanges();
                }
            }
        }

        public List<University> GetAll() => _context.Universities.Include(u => u.Departments).ThenInclude(d => d.Courses).ToList();
        public University? Get(int id) => _context.Universities.Include(u => u.Departments).ThenInclude(d => d.Courses).FirstOrDefault(u => u.Id == id);

        public void Add(University university)
        {
            university.Id = _context.Universities.Any() ? _context.Universities.Max(u => u.Id) + 1 : 1;
            _context.Universities.Add(university);
            _context.SaveChanges();
        }

        public void Update(University university)
        {
            var existingUniversity = _context.Universities.Find(university.Id);
            if (existingUniversity != null)
            {
                _context.Entry(existingUniversity).CurrentValues.SetValues(university);
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var university = _context.Universities.Find(id);
            if (university != null)
            {
                _context.Universities.Remove(university);
                _context.SaveChanges();
            }
        }
    }
}
