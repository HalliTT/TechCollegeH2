using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;

namespace My_FirstAvaloniaProject;

public partial class Forms : UserControl
{
    public Forms()
    {
        InitializeComponent();
    }

    void OnSubmit(object sender, RoutedEventArgs e)
    {
        CheckValues();
    }
    void OnClear(object sender, RoutedEventArgs e)
    {
        FirstName.Clear();
        LastName.Clear();
    }

    void OnLogin(object sender, RoutedEventArgs e)
    {
        ContentArea.Navigate(new FormLogin());
    }

    void CheckValues()
    {
       CheckEmpty();
    }

    void CheckEmpty()
    {
        if (FirstName.Text == null)
        {
            Errors(FirstNameText);
        }
        else if (LastName.Text == null)
        {
            Errors(LastNameText);
        }
        else if (Male.IsChecked == false && Female.IsChecked == false && Something.IsChecked == false)
        {
            Errors(GenderText);
        }
        else if (Elementary.IsChecked == false && Highschool.IsChecked == false && College.IsChecked == false)
        {
            Errors(EducationText);
        }
    }

    void Errors(object name)
    {
        ErrorBoox.Text = name.ToString();
        return;
    }
}