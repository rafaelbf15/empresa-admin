using System;
using System.Collections.Generic;
using System.Text;

namespace EmpresaAdmin.Core.Notifications
{
    public interface INotificator
    {
        bool HasNotifications();
        List<Notification> GetNotifications();
        void Handle(Notification notification);
    }
}
