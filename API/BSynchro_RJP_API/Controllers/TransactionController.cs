using BSynchro_RJP_API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BSynchro_RJP_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        #region General
        private readonly BSynchro_RJPContext _context;
        #endregion


        #region Constractor 
        public TransactionController(BSynchro_RJPContext context)
        {
            _context = context;
        }
        #endregion

        #region Method
        [HttpGet]
        [Route("Get")]
        public IActionResult Get()
        {
            return Ok(_context.Transaction.ToList());
        }
        [HttpPost]
        [Route("Create")]
        public IActionResult Create(Transaction transaction)
        {
            try
            {
                Transaction model = new Transaction();
                model.Amount = transaction.Amount;
                model.DateCreated = System.DateTime.Now;
                model.UserId = transaction.UserId;
                _context.Transaction.Add(model);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (System.Exception ex)
            {
                return Ok(ex.HResult);
            }
        }
        [HttpPost]
        [Route("Edit")]
        public IActionResult Edit(Transaction transaction)
        {
            try
            {
                var model = _context.Transaction.FirstOrDefault(x => x.Id == transaction.Id);
                model.Amount = transaction.Amount;
                model.UserId = transaction.UserId;
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
        public IActionResult Delete(Transaction transaction)
        {
            try
            {
                var model = _context.Transaction.FirstOrDefault(x => x.Id == transaction.Id);
                if (model != null)
                {
                    _context.Transaction.Remove(model);
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
