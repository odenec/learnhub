using System;
using System.IO;
using System.Runtime.InteropServices;

namespace FileExplorer
{
    public class FileManager
    {
        [DllImport("shell32.dll", CharSet = CharSet.Unicode)]
        static extern int SHFileOperation(ref SHFILEOPSTRUCT fileOp);

        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        private struct SHFILEOPSTRUCT
        {
            public IntPtr hwnd;
            public uint wFunc;
            [MarshalAs(UnmanagedType.LPWStr)]
            public string pFrom;
            [MarshalAs(UnmanagedType.LPWStr)]
            public string pTo;
            public ushort fFlags;
            public int fAnyOperationsAborted;
            public IntPtr hNameMappings;
            [MarshalAs(UnmanagedType.LPWStr)]
            public string lpszProgressTitle;
        }

        // Константы для операций с файлами
        private const uint FO_COPY = 0x0002;
        private const uint FO_MOVE = 0x0001;
        private const uint FO_DELETE = 0x0003;
        private const uint FO_RENAME = 0x0004;

        // Флаги для операций
        private const ushort FOF_ALLOWUNDO = 0x0040;
        private const ushort FOF_NOCONFIRMATION = 0x0010;
        private const ushort FOF_SILENT = 0x0004;
        private const ushort FOF_SIMPLEPROGRESS = 0x0100;
        private const ushort FOF_NOERRORUI = 0x0400;
        public void CopyFile(string sourcePath, string destinationPath)
        {
    
            if (!File.Exists(sourcePath))
                throw new FileNotFoundException("Исходный файл не найден");

            string destDir = Path.GetDirectoryName(destinationPath);
            if (!Directory.Exists(destDir))
                Directory.CreateDirectory(destDir);

            File.Copy(sourcePath, destinationPath, true);
        }

        public void MoveFile(string sourcePath, string destinationPath)
        {
            if (!File.Exists(sourcePath))
                throw new FileNotFoundException("Исходный файл не найден");

            string destDir = Path.GetDirectoryName(destinationPath);
            if (!Directory.Exists(destDir))
                Directory.CreateDirectory(destDir);

            File.Move(sourcePath, destinationPath, true);
        }
        public void CopyDirectory(string sourceDir, string destinationDir)
        {
            if (!Directory.Exists(sourceDir))
                throw new DirectoryNotFoundException("Исходная папка не найдена");

  
            Directory.CreateDirectory(destinationDir);

    
            foreach (string file in Directory.GetFiles(sourceDir))
            {
                string destFile = Path.Combine(destinationDir, Path.GetFileName(file));
                File.Copy(file, destFile, true);
            }

          
            foreach (string subDir in Directory.GetDirectories(sourceDir))
            {
                string destSubDir = Path.Combine(destinationDir, Path.GetFileName(subDir));
                CopyDirectory(subDir, destSubDir);
            }
        }

        public void MoveDirectory(string sourceDir, string destinationDir)
        {
            Directory.Move(sourceDir, destinationDir);
        }
        public void RenameFileSystemEntry(string sourcePath, string destinationPath)
        {
            if (File.Exists(sourcePath))
            {
                File.Move(sourcePath, destinationPath);
            }
            else if (Directory.Exists(sourcePath))
            {
                Directory.Move(sourcePath, destinationPath);
            }
            else
            {
                throw new FileNotFoundException("Элемент не найден");
            }

        }
        public void CopyDirectoryWithWinAPI(string sourceDir, string destinationDir, bool showProgress = true, bool allowUndo = true)
        {
            if (!Directory.Exists(sourceDir))
                throw new DirectoryNotFoundException("Исходная папка не найдена");

            Directory.CreateDirectory(destinationDir);

            // WinAPI требует двойной нуль-терминатор для строк
            string from = sourceDir + "\0\0";
            string to = destinationDir + "\0\0";

            SHFILEOPSTRUCT fileOp = new SHFILEOPSTRUCT
            {
                wFunc = FO_COPY,
                pFrom = from,
                pTo = to,
                fFlags = 0
            };

            // Настройка флагов
            if (!showProgress)
                fileOp.fFlags |= FOF_SILENT; // Без отображения прогресса

            if (allowUndo)
                fileOp.fFlags |= FOF_ALLOWUNDO; // Разрешить отмену (Ctrl+Z)

            if (!showProgress)
                fileOp.fFlags |= FOF_NOERRORUI; // Не показывать ошибки

            // Выполняем операцию копирования
            int result = SHFileOperation(ref fileOp);

            if (result != 0)
            {
                throw new Exception($"Ошибка при копировании папки. Код ошибки: {result}");
            }
        }
    }
}
    