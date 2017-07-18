using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ang_webapi.Models;
using ang_webapi.Database;
using Microsoft.EntityFrameworkCore;

namespace ang_webapi.Controllers
{
    [Route("api/[controller]")]
    public class CatsController : Controller
    {
        CatContext _db;
        public CatsController(CatContext db) {
            _db = db;
        }
        
        // GET api/values
        [HttpGet]
        public IEnumerable<Cat> Get()
        {
        	return _db.Cats.ToList();
        }

        [HttpGet("{id}", Name="GetCat")]
        public Cat Get(int id)
        {
            return _db.Cats.SingleOrDefault(c => c.Id == id);
        }

        [HttpPost]
        public IActionResult Create([FromBody]Cat cat)
        {
            if(cat == null)
                return BadRequest();

            _db.Cats.Add(cat);
            _db.SaveChanges();
            
            return CreatedAtRoute("GetCat", new { id = cat.Id }, cat);
        }

    }
}