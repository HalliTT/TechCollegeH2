using Avalonia;
using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;

namespace My_FirstAvaloniaProject;

public partial class CustomButton : UserControl
{
    public event CustomEventHandler CustomEvent;
    public CustomButton()
    {
        InitializeComponent();
        PointerReleased += Released;
    }

    public void Released(object sender, PointerReleasedEventArgs e)
    {
        CustomEventArgs mouseClickArgs = new CustomEventArgs();

        switch (e.InitialPressMouseButton)
        {
            case MouseButton.Left:
                mouseClickArgs.MouseButton = "Left";
                break;
            case MouseButton.Right:
                mouseClickArgs.MouseButton = "Right";
                break;
            case MouseButton.Middle:
                mouseClickArgs.MouseButton = "Middle";
                break;
            case MouseButton.XButton1:
                mouseClickArgs.MouseButton = "X 1";
                break;
            case MouseButton.XButton2:
                mouseClickArgs.MouseButton = "X 2";
                break;
            default:
                mouseClickArgs.MouseButton = "Left";
                break;
        }
        CustomEvent.Invoke(this, mouseClickArgs); 
    }

}