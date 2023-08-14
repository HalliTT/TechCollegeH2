using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;
using Avalonia.Interactivity;
using System;

namespace My_FirstAvaloniaProject;

public partial class MyUserControl : UserControl
{
    public MyUserControl()
    {
        InitializeComponent();
    }

    void ButtonClick(object sender, RoutedEventArgs e)
    {
        Button button = (Button)sender;
        if(UserName  != null)
        {
            button.Content = UserName.Text;
        }
        else
        {
        button.Content = "You clicked me!";
        }
    }
}