using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Trabajo.Context;
using Trabajo.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Trabajo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {

        private readonly ClientRepository clientRepository;
        public ClienteController()
        {
            clientRepository = new ClientRepository();
        }

        // GET: api/<ClienteController>
        [HttpGet]
        public IEnumerable<Sb_cliente> Get()
        {
            return clientRepository.GetAll();
        }

        // GET api/<ClienteController>/5
        [HttpGet("{id}", Name = "GetSb_cliente")]
        public Sb_cliente Get(int id)
        {
            return clientRepository.GetbyId(id);
        }

        // POST api/<ClienteController>
        [HttpPost]
        public void Post([FromBody] Sb_cliente sb_)
        {
            if (ModelState.IsValid)
                clientRepository.Add(sb_);
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Sb_cliente sb_)
        {
            sb_.Codigo = id;
            if (ModelState.IsValid)
                clientRepository.Update(sb_);
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            clientRepository.Delete(id);
        }
    }
}
