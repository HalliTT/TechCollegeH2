using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace My_FirstAvaloniaProject;

public partial class ContentArea : UserControl
{
    static ContentArea? Instance;

    static Forms formPage;
    static CalendarControl calendarPage;
    static FormLogin loginPage;
    public ContentArea()
    {
        InitializeComponent();
        if(Instance == null)
        {
            Instance = this;
            formPage = new Forms();
            calendarPage = new CalendarControl();
            loginPage = new FormLogin();
        }
    }

    public static void Navigate(UserControl control)
    {
        if(Instance == null)
        {
            return;
        }
        Instance.Content = control;
    }

    public static void ShowFormPage() => Navigate(formPage);
    public static void ShowCalendarPage() => Navigate(calendarPage);
    public static void ShowLoginPage() => Navigate(loginPage);


}