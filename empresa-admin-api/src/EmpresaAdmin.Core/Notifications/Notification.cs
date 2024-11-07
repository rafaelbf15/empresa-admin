using System;
using System.Collections.Generic;
using System.Text;

namespace EmpresaAdmin.Core.Notifications
{
    public class Notification
    {
        public Notification(string message)
        {
            Message = message;
        }

        public string Message { get; }
    }
}
