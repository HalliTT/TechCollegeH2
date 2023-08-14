using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Primitives;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using System;

namespace My_FirstAvaloniaProject;

public partial class CalendarControl : UserControl
{
    public CalendarControl()
    {
        InitializeComponent();
    }


    void OnDateChanged(object sender, SelectionChangedEventArgs e)
    {
        Calendar cl = (Calendar)sender;
        if(cl.SelectedDates.Count > 5)
        {
            cl.IsVisible = false;
        }
    }
    void OnLostFocus(object sender, TextChangedEventArgs e)
    {
        TextBox txt = (TextBox)sender;
        var number = Convert.ToDouble(txt.Text);
        txt.FontSize = number * 10;
    }
    void OnLogOut(object sender, RoutedEventArgs e)
    {
        ContentArea.Navigate(new Forms());
    }
}