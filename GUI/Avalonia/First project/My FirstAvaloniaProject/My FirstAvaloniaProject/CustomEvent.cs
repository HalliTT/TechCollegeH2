using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace My_FirstAvaloniaProject
{
    public class CustomEventArgs : EventArgs
    {
        public string MouseButton { get; set; }
    }

    public delegate void CustomEventHandler(object sender, CustomEventArgs e);
}
