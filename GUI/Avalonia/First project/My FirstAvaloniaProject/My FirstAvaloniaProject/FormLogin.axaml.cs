using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;

namespace My_FirstAvaloniaProject;

public partial class FormLogin : UserControl
{
    public FormLogin()
    {
        InitializeComponent();
    }

    public void OnCreatUser(object sender, RoutedEventArgs e)
    {
        ContentArea.Navigate(new Forms());
    }

    public void OnLogin(object sender, RoutedEventArgs e)
    {
        ContentArea.Navigate(new CalendarControl());
    }
}