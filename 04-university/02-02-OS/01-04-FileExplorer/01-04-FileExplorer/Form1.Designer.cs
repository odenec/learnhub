namespace _01_04_FileExplorer
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            textBox = new TextBox();
            textPath = new Button();
            listBox = new ListBox();
            propertiesBox = new TextBox();
            btnCopy = new Button();
            btnMove = new Button();
            SuspendLayout();
            // 
            // textBox
            // 
            textBox.Location = new Point(38, 40);
            textBox.Name = "textBox";
            textBox.Size = new Size(523, 23);
            textBox.TabIndex = 0;
            //textBox.TextChanged += textBox1_TextChanged;
            // 
            // textPath
            // 
            textPath.Location = new Point(610, 40);
            textPath.Name = "textPath";
            textPath.Size = new Size(75, 23);
            textPath.TabIndex = 1;
            textPath.Text = "Перейти";
            textPath.UseVisualStyleBackColor = true;
            // 
            // listBox
            // 
            listBox.FormattingEnabled = true;
            listBox.Location = new Point(38, 100);
            listBox.Name = "listBox";
            listBox.Size = new Size(344, 319);
            listBox.TabIndex = 2;
            // 
            // propertiesBox
            // 
            propertiesBox.Location = new Point(388, 100);
            propertiesBox.Multiline = true;
            propertiesBox.Name = "propertiesBox";
            propertiesBox.ReadOnly = true;
            propertiesBox.Size = new Size(297, 319);
            propertiesBox.TabIndex = 3;
            //propertiesBox.TextChanged += textBox1_TextChanged_1;
            // 
            // btnCopy
            // 
            btnCopy.Location = new Point(691, 99);
            btnCopy.Name = "btnCopy";
            btnCopy.Size = new Size(75, 23);
            btnCopy.TabIndex = 4;
            btnCopy.Text = "Копировать";
            btnCopy.UseVisualStyleBackColor = true;
            // 
            // btnMove
            // 
            btnMove.Location = new Point(691, 128);
            btnMove.Name = "btnMove";
            btnMove.Size = new Size(75, 23);
            btnMove.TabIndex = 5;
            btnMove.Text = "Переместить";
            btnMove.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(btnMove);
            Controls.Add(btnCopy);
            Controls.Add(propertiesBox);
            Controls.Add(listBox);
            Controls.Add(textPath);
            Controls.Add(textBox);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox textBox;
        private Button textPath;
        private ListBox listBox;
        private TextBox propertiesBox;
        private Button btnCopy;
        private Button btnMove;
    }
}
