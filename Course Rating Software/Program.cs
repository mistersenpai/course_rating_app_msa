using Microsoft.EntityFrameworkCore;
using Models;
using Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CourseContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<DepartmentService>();
builder.Services.AddScoped<CourseService>();
builder.Services.AddScoped<UniversityService>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Ensure database is populated with initial data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var universityService = services.GetRequiredService<UniversityService>();
    var departmentService = services.GetRequiredService<DepartmentService>();
    var courseService = services.GetRequiredService<CourseService>();
}

app.Run();
