using BSynchro_RJP_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BSynchro_RJP_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region General
        private readonly BSynchro_RJPContext _context;
        #endregion


        #region Constractor 
        public UserController(BSynchro_RJPContext context)
        {
            _context = context;
        }
        #endregion

        #region Method
        [HttpGet]
        [Route("Get")]
        public IActionResult Get()
        {
            return Ok(_context.User.ToList());
        }

        [HttpGet]
        [Route("GetUsersWithTransactions")]
        public IActionResult GetUsersWithTransactions()
        {
            return Ok(_context.User.Include("Transaction").ToList());
        }
        [HttpPost]
        [Route("Create")]
        public IActionResult Create(User user, int? customerID, decimal? initialCredit)
        {
            try
            {
                if (initialCredit != 0 && customerID != null)
                {
                    var currentUser = _context.User.FirstOrDefault(x => x.Id == customerID);
                    if(currentUser != null)
                    {
                        Transaction transaction = new Transaction();
                        transaction.Amount = initialCredit;
                        transaction.DateCreated = System.DateTime.Now;
                        transaction.UserId = currentUser.Id;
                        _context.Transaction.Add(transaction);
                        _context.SaveChanges();
                    }
                    currentUser.Balance += initialCredit;
                    _context.SaveChanges();
                }
                else
                {
                    User userModel = new User();
                    userModel.Name = user.Name;
                    userModel.Surname = user.Surname;
                    userModel.Balance = user.Balance;
                    userModel.DateCreated = System.DateTime.Now;
                    _context.User.Add(userModel);
                    _context.SaveChanges();
                }
                return Ok("Success");
            }
            catch (System.Exception ex)
            {
                return Ok(ex.HResult);
            }
        }
        [HttpPost]
        [Route("Edit")]
        public IActionResult Edit(User user)
        {
            try
            {
                var model = _context.User.FirstOrDefault(x => x.Id == user.Id);
                model.Name = user.Name;
                model.Surname = user.Surname;
                model.Balance = user.Balance;
                model.DateUpdated = System.DateTime.Now;
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (System.Exception ex)
            {
                return Ok(ex.HResult);
            }
        }

        [HttpPost]
        [Route("Delete")]
        public IActionResult Delete(User user)
        {
            try
            {
                var model = _context.User.FirstOrDefault(x => x.Id == user.Id);
                if (model != null)
                {
                    _context.User.Remove(model);
                    _context.SaveChanges();
                }
                return Ok("Success");
            }
            catch (System.Exception ex)
            {
                return Ok(ex.HResult);
            }
        }
        #endregion
    }
}
