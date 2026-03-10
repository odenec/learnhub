using FileExplorer;
using System;
using System.IO;
using System.Windows.Forms;
using System.Runtime.InteropServices;
namespace _01_04_FileExplorer
{
    public partial class Form1 : Form
    {
        private FileManager _fileManager;
        private string _selectedFilePath;
        private string _currentPath;

        public Form1()
        {
            InitializeComponent();
            _fileManager = new FileManager();
            _selectedFilePath = string.Empty;
            _currentPath = Environment.CurrentDirectory;


            LoadDirectory(Environment.CurrentDirectory);
            textBox.Text = Environment.CurrentDirectory;


            this.textPath.Click += BtnGo_Click;
            this.listBox.SelectedIndexChanged += ListBox_SelectedIndexChanged;
            this.listBox.DoubleClick += ListBox_DoubleClick;
            this.btnCopy.Click += BtnCopy_Click;
            this.btnMove.Click += BtnMove_Click;
            this.btnRename.Click += BtnRename_Click;
            this.btnDiskInfo.Click += BtnDiskInfo_Click;
        }
        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        private static extern bool GetDiskFreeSpaceEx(
            string lpDirectoryName,
            out ulong lpFreeBytesAvailable,
            out ulong lpTotalNumberOfBytes,
            out ulong lpTotalNumberOfFreeBytes);
        private string GetDiskSpaceInfo(string path)
        {
            try
            {
                string rootPath = Path.GetPathRoot(path);

                ulong freeBytesAvailable;
                ulong totalBytes;
                ulong totalFreeBytes;

                if (GetDiskFreeSpaceEx(rootPath, out freeBytesAvailable, out totalBytes, out totalFreeBytes))
                {
                    double totalGB = totalBytes / (1024.0 * 1024.0 * 1024.0);
                    double freeGB = totalFreeBytes / (1024.0 * 1024.0 * 1024.0);
                    double usedGB = totalGB - freeGB;

                    return $"Диск {rootPath}\r\n" +
                           $"Всего: {totalGB:F2} ГБ\r\n" +
                           $"Свободно: {freeGB:F2} ГБ\r\n" +
                           $"Занято: {usedGB:F2} ГБ\r\n" +
                           $"Свободно: {((double)totalFreeBytes / totalBytes * 100):F1}%";
                }
                else
                {
                    return "Не удалось получить информацию о диске";
                }
            }
            catch (Exception ex)
            {
                return $"Ошибка: {ex.Message}";
            }
        }
        private void BtnGo_Click(object sender, EventArgs e)
        {
            string newPath = textBox.Text;

            if (Directory.Exists(newPath))
            {
                LoadDirectory(newPath);
            }
            else
            {
                MessageBox.Show("Папка не найдена");
                textBox.Text = _currentPath;
            }
        }
        private void BtnDiskInfo_Click(object sender, EventArgs e)
        {
            string diskInfo = GetDiskSpaceInfo(_currentPath);
            propertiesBox.Text = diskInfo;
        }
        private void ListBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBox.SelectedItem != null)
            {
                string fileName = listBox.SelectedItem.ToString();
                if (fileName == "..")
                {
                    _selectedFilePath = string.Empty;
                    btnCopy.Enabled = false;
                    btnMove.Enabled = false;
                    btnRename.Enabled = false;
                    propertiesBox.Clear();
                    return;
                }
                string fullPath = Path.Combine(textBox.Text, fileName);

                if (File.Exists(fullPath) || Directory.Exists(fullPath))
                {
                    _selectedFilePath = fullPath;

                    if (File.Exists(fullPath))
                    {
                        ShowFileProperties(fullPath);
                    }
                    else
                    {
                        propertiesBox.Clear();
                    }

                  
                    btnCopy.Enabled = true;
                    btnMove.Enabled = true;
                    btnRename.Enabled = true;
                }
                else
                {
                    btnCopy.Enabled = false;
                    btnMove.Enabled = false;
                    btnRename.Enabled = false;
                    propertiesBox.Clear();
                }
            }
        }

private void ListBox_DoubleClick(object sender, EventArgs e)
{
    if (listBox.SelectedItem != null)
    {
        string fileName = listBox.SelectedItem.ToString();
        
        if (fileName == "..")
        {
            string parentPath = Directory.GetParent(textBox.Text)?.FullName;
            if (parentPath != null)
            {
                LoadDirectory(parentPath);
                textBox.Text = parentPath;
            }
            return;
        }
        
        if (fileName.EndsWith("\\"))
        {
            fileName = fileName.Substring(0, fileName.Length - 1);
        }
        
        string fullPath = Path.Combine(textBox.Text, fileName);

        if (Directory.Exists(fullPath))
        {
            LoadDirectory(fullPath);
            textBox.Text = fullPath;
        }
    }
}

        private void BtnCopy_Click(object sender, EventArgs e)
        {
            PerformFileOperation(_selectedFilePath, OperationType.Copy);
        }

        private void BtnMove_Click(object sender, EventArgs e)
        {
            PerformFileOperation(_selectedFilePath, OperationType.Move);
        }
        private void BtnRename_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(_selectedFilePath))
            {
                MessageBox.Show("Выберите файл или папку для переименования");
                return;
            }

            try
            {

                string cleanPath = _selectedFilePath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
                string currentName = Path.GetFileName(cleanPath);

                string newName = Microsoft.VisualBasic.Interaction.InputBox(
                    "Введите новое имя:",
                    "Переименование",
                    currentName,
                    -1, -1);

                if (!string.IsNullOrEmpty(newName))
                {
                    string directory = Path.GetDirectoryName(cleanPath);
                    string newPath = Path.Combine(directory, newName);

                    _fileManager.RenameFileSystemEntry(_selectedFilePath, newPath);

                    MessageBox.Show("Переименовано успешно!");
                    LoadDirectory(directory);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Ошибка: " + ex.Message);
            }
        }

        private void LoadDirectory(string path)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(path))
                {
                    MessageBox.Show("Введите путь к папке");
                    return;
                }

                if (!Directory.Exists(path))
                {
                    MessageBox.Show("Папка не найдена");
                    return;
                }

                listBox.Items.Clear();


                if (Directory.GetParent(path) != null)
                {
                    listBox.Items.Add("..");
                }


                foreach (string dir in Directory.GetDirectories(path))
                {
                    DirectoryInfo dirInfo = new DirectoryInfo(dir);
                    listBox.Items.Add(dirInfo.Name + "\\");
                }

                foreach (string file in Directory.GetFiles(path))
                {
                    FileInfo fileInfo = new FileInfo(file);
                    listBox.Items.Add(fileInfo.Name);
                }

                textBox.Text = path;
                _currentPath = path;
                _selectedFilePath = string.Empty;
                btnCopy.Enabled = false;
                btnRename.Enabled = false;
                btnMove.Enabled = false;
                propertiesBox.Clear();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Ошибка: " + ex.Message);
            }
        }

        private void ShowFileProperties(string filePath)
        {
            try
            {
                FileInfo fileInfo = new FileInfo(filePath);

                string properties = $"Имя файла: {fileInfo.Name}\r\n";
                properties += $"Размер: {FormatSize(fileInfo.Length)}\r\n";
                properties += $"Расширение: {fileInfo.Extension}\r\n";
                properties += $"Создан: {fileInfo.CreationTime}\r\n";
                properties += $"Изменен: {fileInfo.LastWriteTime}\r\n";

                propertiesBox.Text = properties;
            }
            catch (Exception ex)
            {
                propertiesBox.Text = "Ошибка: " + ex.Message;
            }
        }

        private string FormatSize(long bytes)
        {
            string[] sizes = { "Б", "КБ", "МБ", "ГБ" };
            double len = bytes;
            int order = 0;

            while (len >= 1024 && order < sizes.Length - 1)
            {
                order++;
                len = len / 1024;
            }

            return $"{len:0.##} {sizes[order]}";
        }

        private void PerformFileOperation(string sourcePath, OperationType operation)
        {
            try
            {
                using (FolderBrowserDialog dialog = new FolderBrowserDialog())
                {
                    dialog.Description = "Выберите папку назначения";
                    dialog.ShowNewFolderButton = true;

                    if (dialog.ShowDialog() == DialogResult.OK)
                    {
                        string destDir = dialog.SelectedPath;
                        string itemName = Path.GetFileName(sourcePath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar));
                        string destPath = Path.Combine(destDir, itemName);

                        if (File.Exists(sourcePath))
                        {
                            
                            if (operation == OperationType.Copy)
                            {
                                _fileManager.CopyFile(sourcePath, destPath);
                                MessageBox.Show("Файл скопирован!");
                            }
                            else
                            {
                                _fileManager.MoveFile(sourcePath, destPath);
                                MessageBox.Show("Файл перемещен!");
                                LoadDirectory(destDir);
                                textBox.Text = destDir;
                            }
                        }
                        else if (Directory.Exists(sourcePath))
                        {
                            
                            if (operation == OperationType.Copy)
                            {
                                _fileManager.CopyDirectoryWithWinAPI(sourcePath, destPath);
                                MessageBox.Show("Папка скопирована!");
                            }
                            else
                            {
                                _fileManager.MoveDirectory(sourcePath, destPath);
                                MessageBox.Show("Папка перемещена!");
                                LoadDirectory(destDir);
                                textBox.Text = destDir;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Ошибка: " + ex.Message);
            }
        }


    }

    public enum OperationType
    {
        Copy,
        Move
    }
}