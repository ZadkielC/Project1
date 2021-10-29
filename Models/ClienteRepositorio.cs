using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Trabajo.Models
{
    public class ClientRepository
    {
        private string connectionString;

        public ClientRepository()
        {
            connectionString = @"Data Source=DESKTOP-THP4507; Initial Catalog=Edutech;Integrated Security=true;";
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(connectionString);
            }

        }

        public void Add(Sb_cliente sb_)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"INSERT INTO Sb_client (Nombre, Telefono, Email) VALUES(@Nombre, @Telefono, @Email)";
                dbConnection.Open();
                dbConnection.Execute(sQuery, sb_);
            }
        }

        public IEnumerable<Sb_cliente> GetAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"Select * FROM Sb_client";
                dbConnection.Open();
                return dbConnection.Query<Sb_cliente>(sQuery);
            }
        }

        public Sb_cliente GetbyId(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"Select * FROM Sb_client where Codigo=@Id";
                dbConnection.Open();
                return dbConnection.Query<Sb_cliente>(sQuery, new { Id = id }).FirstOrDefault();
            }
        }

        public void Delete(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"DELETE FROM Sb_client where Codigo=@id";
                dbConnection.Open();
                dbConnection.Execute(sQuery, new { Id = id });
            }
        }
        public void Update(Sb_cliente sb_)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"Update Sb_client SET Nombre=@Nombre, Telefono=@Telefono, Email=@Email where Codigo=@Codigo";
                dbConnection.Open();
                dbConnection.Query(sQuery, sb_);
            }
        }
    }
}
