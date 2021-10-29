using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Trabajo.Models
{
    public class Sb_cliente
    {
        [Key]
        public int Codigo { get; set; }
        public string Nombre { get; set; }
        public int Telefono { get; set; }
        public string Email { get; set; }
    }
}
