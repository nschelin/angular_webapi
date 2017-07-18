using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using System.IO;
using ang_webapi.Database;
using ang_webapi.Models;

namespace ang_webapi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<CatContext>(options => options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();
            app.UseMvcWithDefaultRoute();
            
            var context = app.ApplicationServices.GetService<CatContext>();
            AddExampleData(context);

            app.UseDefaultFiles();  // sets default file (index.html) as initial file
            // allows node_modules to be referenenced in index.html; 
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(env.ContentRootPath, "node_modules")
                ),
                RequestPath = "/" + "node_modules"
            });

            app.UseStaticFiles();
        }

        public static void AddExampleData(CatContext context) {

            if(context.Database.EnsureCreated()) {
                if(!context.Cats.Any()) {
                    var c1 = new Cat {
                        Name = "Tom",
                        Type = "Persian",
                        Age = 5
                    };

                    var c2 = new Cat {

                        Name = "Sylvester",
                        Type = "Tabby",
                        Age = 3
                    };

                    context.Cats.Add(c1);
                    context.Cats.Add(c2);
                    context.SaveChanges();
                }
                
            }
        }
    }
}
