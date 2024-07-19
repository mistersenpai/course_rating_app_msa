using Microsoft.EntityFrameworkCore;
using Models;
using Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CourseContext>(options =>
    options.UseInMemoryDatabase("CourseList"));

builder.Services.AddScoped<DepartmentService>();
builder.Services.AddScoped<CourseService>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
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
    var departmentService = services.GetRequiredService<DepartmentService>();
    var courseService = services.GetRequiredService<CourseService>();
}

app.Run();
