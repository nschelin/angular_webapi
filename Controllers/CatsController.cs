using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ang_webapi.Controllers
{
    [Route("api/[controller]")]
    public class CatsController : Controller
    {
        List<Cat> cats = new List<Cat>{
            new Cat {
                Id = 1,
                Name = "Tom",
                Type = "Persian",
                Age = 5
            },

             new Cat {
                Id = 2,
                Name = "Sylvester",
                Type = "Tabby",
                Age = 3
            }
        };
        // GET api/values
        [HttpGet]
        public IEnumerable<Cat> Get()
        {
        	return cats;
        }

        [HttpGet("{id}")]
        public Cat Get(int id)
        {
            return cats.SingleOrDefault(c => c.Id == id);
        }
    }
    
    public class Cat {
        public int Id { get; set; }
    	public string Name { get; set; }
    	public string Type { get; set; }
    	public int Age { get; set; }
    }
}