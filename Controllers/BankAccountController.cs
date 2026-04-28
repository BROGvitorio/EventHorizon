//using EventHorizon_API.Repositories;
//using Microsoft.AspNetCore.Http.HttpResults;
//using Microsoft.AspNetCore.Mvc;

//namespace EventHorizon_API.Controllers 
//{

//    public class BankAccountController : ControllerBase
//    {
//        private readonly IBankAccountRepository _repository;

//        public BankAccountController(IBankAccountRepository repository)
//        {
//            _repository = repository;
//        }

//        [HttpGet]
//        public async Task<IActionResult> Get() => Ok(await _repository.ListBankAccounts());
//    }
//}
