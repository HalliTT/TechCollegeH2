using Avalonia.Controls;

namespace My_FirstAvaloniaProject
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Instance = this;
            ContentArea.Navigate(new Forms());
        }

        public static MainWindow Instance
        {
            get;
            private set;
        }

        public void Tttt(object sender, CustomEventArgs e)
        {
            CustomButton btn = (CustomButton)sender;
            btn.Content = e.MouseButton.ToString();
        }
    }
}