using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace _2_04_program
{
    public partial class Window : Form
    {
        private ThermalConductivityCalculator calculator = new ThermalConductivityCalculator();
        private ProgramInfo programInfo = new ProgramInfo();
        public Window()
        {
            InitializeComponent();
        }
        public class ThermalConductivityCalculator
        {
            public string CalculateThermalConductivity(string substance)
            {
                double[] temperatures = { 200, 220, 240, 260, 280, 300 };

                double[] experimentalNO = { 17.6, 19.3, 21.0, 22.7, 24.3, 25.9 };
                double[] experimentalNH3 = { 13.25, 15.33, 17.50, 19.74, 22.05, 24.44 };

                if (substance == "NO")
                    return CalculateNO(temperatures, experimentalNO);
                else if (substance == "NH3")
                    return CalculateNH3(temperatures, experimentalNH3);

                return "";
            }

            private static string CalculateNO(double[] temperatures, double[] experimentalNO)
            {
                string result = "ОКСИД АЗОТА (NO)\r\n";
                result += "  T(K) |  Расчёт  | Эксперимент | Разница  |\r\n";

                for (int i = 0; i < temperatures.Length; i++)
                {
                    double T = temperatures[i];

                    double lambda = -2.42
                                   + 0.114 * T
                                   - 7.95e-5 * Math.Pow(T, 2)
                                   + 4.85e-8 * Math.Pow(T, 3);

                    double experimental = experimentalNO[i];
                    double diff = lambda - experimental;
                    double percentDiff = (diff / experimental) * 100;

                    result += $"  {T,3} |  {lambda,6:F3}  |   {experimental,6:F2}    |  {diff,6:F2} ({percentDiff,5:F1}%) |\r\n";
                }
                result += "─────────────────────────────────────────────────\r\n";
                result += "Примечание: значения λ·10³ в Вт/(м·К)";
                return result;
            }

            private static string CalculateNH3(double[] temperatures, double[] experimentalNH3)
            {
                string result = "АММИАК (NH3)\r\n";
                result += "  T(K) |  Расчёт  | Эксперимент | Разница  |\r\n";

                for (int i = 0; i < temperatures.Length; i++)
                {
                    double T = temperatures[i];

                    double lambda = -2.46
                                   + 0.0525 * T
                                   + 1.43e-4 * Math.Pow(T, 2)
                                   - 0.635e-7 * Math.Pow(T, 3);

                    double experimental = experimentalNH3[i];
                    double difference = lambda - experimental;
                    double percentDiff = (difference / experimental) * 100;

                    result += $"  {T,3} |  {lambda,6:F3}  |   {experimental,6:F2}    |  {difference,6:F2} ({percentDiff,5:F1}%) |\r\n";
                }
                result += "─────────────────────────────────────────────────\r\n";
                result += "Примечание: значения λ·10³ в Вт/(м·К)";
                return result;
            }
        }
        public class ProgramInfo
        {
            private const string ProgramVersion = "Версия 1.0";
            private const string ProgramDate = "Дата изменения: 17.02.2026";
            private const string ProgramAuthor = "Автор: Студент группы Папихин Владислав Евгеньевич";

            public string GetProgramInfo()
            {
                string info = "ИНФОРМАЦИЯ О ПРОГРАММЕ\r\n";
                info += "══════════════════════\r\n";
                info += ProgramVersion + "\r\n";
                info += ProgramDate + "\r\n";
                info += ProgramAuthor + "\r\n";
                info += "══════════════════════\r\n";
                info += "Назначение: Расчёт теплопроводности газов\r\n";
                info += "Формулы для оксида азота и аммиака\r\n";
                info += "Диапазон температур: 200-300 К";

                return info;
            }
        }



        private void button1_Click_1(object sender, EventArgs e)
        {
            string result = calculator.CalculateThermalConductivity("NO");
            textBox1.Text = result;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string result = calculator.CalculateThermalConductivity("NH3");
            textBox1.Text = result;
        }

        private void button3_Click(object sender, EventArgs e)
        {

            string info = programInfo.GetProgramInfo();
            textBox1.Text = info;
        }


    }
}
