using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace My_FirstAvaloniaProject;

public partial class ValutaControl : UserControl
{
    public ValutaControl()
    {
        InitializeComponent();
    }

    void SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        ComboBox cb = (ComboBox)sender;
        ComboBoxItem item = (ComboBoxItem)cb.SelectedItem;
        MainWindow.Instance.Title = item.Content.ToString();
    }
}