using System;
using System.IO;

namespace FileExplorer
{
    public class FileManager
    {
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
    }
}