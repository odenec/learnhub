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
    }
}