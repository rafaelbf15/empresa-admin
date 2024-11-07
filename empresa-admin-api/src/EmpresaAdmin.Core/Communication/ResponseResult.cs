using System;
using System.Collections.Generic;
using System.Text;

namespace EmpresaAdmin.Core.Communication
{
    public class ResponseResult
    {
        public ResponseResult()
        {
            Erros = new ResponseErrorMessages();
        }

        public string Titulo { get; set; }
        public int Status { get; set; }
        public ResponseErrorMessages Erros { get; set; }
    }

    public class ResponseErrorMessages
    {
        public ResponseErrorMessages()
        {
            Mensagens = new List<string>();
        }

        public List<string> Mensagens { get; set; }
    }
}
