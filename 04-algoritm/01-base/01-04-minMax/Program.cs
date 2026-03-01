int maxnumber = MaxMinAlgoritm.Maximum([1, 3, 4]);
Console.WriteLine(maxnumber);

class MaxMinAlgoritm
{
    public static int Maximum(int[] numbers)
    {
        int maxNumber = numbers[0];
        for (int i = 1; i < numbers.Length; i++)
        {
            maxNumber = numbers[i] > maxNumber ? numbers[i] : maxNumber;
        }
        return maxNumber;
    }

    public int Minimum(int[] numbers)
    {
        int minNumber = numbers[0];
        for (int i = 1; i < numbers.Length; i++)
        {
            minNumber = numbers[i] < minNumber ? numbers[i] : minNumber;
        }
        return minNumber;
    }
}
