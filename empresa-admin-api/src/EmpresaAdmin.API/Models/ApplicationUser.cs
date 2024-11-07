using Microsoft.AspNetCore.Identity;
using System;

namespace EmpresaAdmin.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Active { get; set; }

        public ApplicationUser()
        {
        }

        public void SetActive(bool active)
        {
            Active = active;
        }
    }
}
