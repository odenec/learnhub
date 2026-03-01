namespace _01_04_FileExplorer
{
    partial class Form1
    {

        private System.ComponentModel.IContainer components = null;


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
            btnRename = new Button();
            btnDiskInfo = new Button();
            SuspendLayout();
            // 
            // textBox
            // 
            textBox.Location = new Point(43, 57);
            textBox.Margin = new Padding(3, 4, 3, 4);
            textBox.Name = "textBox";
            textBox.Size = new Size(754, 27);
            textBox.TabIndex = 0;
            // 
            // textPath
            // 
            textPath.Location = new Point(816, 57);
            textPath.Margin = new Padding(3, 4, 3, 4);
            textPath.Name = "textPath";
            textPath.Size = new Size(86, 31);
            textPath.TabIndex = 1;
            textPath.Text = "Перейти";
            textPath.UseVisualStyleBackColor = true;
            // 
            // listBox
            // 
            listBox.FormattingEnabled = true;
            listBox.Location = new Point(43, 133);
            listBox.Margin = new Padding(3, 4, 3, 4);
            listBox.Name = "listBox";
            listBox.Size = new Size(393, 424);
            listBox.TabIndex = 2;
            // 
            // propertiesBox
            // 
            propertiesBox.Location = new Point(443, 133);
            propertiesBox.Margin = new Padding(3, 4, 3, 4);
            propertiesBox.Multiline = true;
            propertiesBox.Name = "propertiesBox";
            propertiesBox.ReadOnly = true;
            propertiesBox.Size = new Size(326, 185);
            propertiesBox.TabIndex = 3;
            // 
            // btnCopy
            // 
            btnCopy.Location = new Point(790, 132);
            btnCopy.Margin = new Padding(3, 4, 3, 4);
            btnCopy.Name = "btnCopy";
            btnCopy.Size = new Size(86, 31);
            btnCopy.TabIndex = 4;
            btnCopy.Text = "Копировать";
            btnCopy.UseVisualStyleBackColor = true;
            // 
            // btnMove
            // 
            btnMove.Location = new Point(790, 171);
            btnMove.Margin = new Padding(3, 4, 3, 4);
            btnMove.Name = "btnMove";
            btnMove.Size = new Size(86, 31);
            btnMove.TabIndex = 5;
            btnMove.Text = "Переместить";
            btnMove.UseVisualStyleBackColor = true;
            // 
            // btnRename
            // 
            btnRename.Location = new Point(790, 209);
            btnRename.Margin = new Padding(3, 4, 3, 4);
            btnRename.Name = "btnRename";
            btnRename.Size = new Size(86, 31);
            btnRename.TabIndex = 6;
            btnRename.Text = "Переименовать";
            btnRename.UseVisualStyleBackColor = true;
            // 
            // btnDiskInfo
            // 
            btnDiskInfo.Location = new Point(790, 247);
            btnDiskInfo.Name = "btnDiskInfo";
            btnDiskInfo.Size = new Size(102, 29);
            btnDiskInfo.TabIndex = 7;
            btnDiskInfo.Text = "Св-ва диска";
            btnDiskInfo.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(914, 600);
            Controls.Add(btnDiskInfo);
            Controls.Add(btnRename);
            Controls.Add(btnMove);
            Controls.Add(btnCopy);
            Controls.Add(propertiesBox);
            Controls.Add(listBox);
            Controls.Add(textPath);
            Controls.Add(textBox);
            Margin = new Padding(3, 4, 3, 4);
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
        private Button btnRename;
        private Button btnDiskInfo;
    }
}
