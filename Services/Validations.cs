//using EventHorizon_API.Models;

//namespace EventHorizon_API.Services
//{
//    public class Validations
//    {
//        static public string? Email(string email)
//        {
//            bool containsAt = false;

//            if (email == "")
//            {
//                throw new Exception("O seu email não pode ser nulo!");
//            }

//            if (!email.Contains('@') /*&& a ocorrencia for ntes do final da string */) throw new Exception("O seu email deve conter um domínio");

//            int i = 0;
//            while (i < email.Length)
//            {
//                if (email[i] == '@') containsAt = true;

//                if (!char.IsAsciiLetterOrDigit(email[i]) && (email[i] != '.') && (email[i] != '_') && (email[i] != '@'))
//                {
//                    Console.Clear();
//                    Console.WriteLine("Seu email deve conter apenas letras não acentuadas, dígitos, \".\" e/ou \"_\"! Tente novamente.");
//                    isValidInput = false;
//                    break;
//                }
//                i++;
//            }

//            if (!containsAt)
//            {
//                Console.Clear();
//                Console.WriteLine("Seu email deve conter um domínio. Ex.: @gmail.com, @hotmail.com, etc.");
//                isValidInput = false;
//                continue;
//            }

//            foreach (User user in users)
//            {
//                if (user.Email == email)
//                {
//                    Console.Clear();
//                    Console.WriteLine("Esse email já está cadastrado.");
//                    isValidInput = false;
//                }
//            }

//            return email;
//        }
//    }
//}
