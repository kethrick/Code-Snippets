using System;
using System.Collections.Generic;
using System.IO;

namespace Anagrams
{
    class Anagrams
    {
        static void Main(string[] args)
        {
            // Read and sort dictionary
            var d = Read();

            // Read user input and show anagrams
            string line;
            while ((line = Console.ReadLine()) != null)
            {
                Show(d, line);
            }
        }

        static Dictionary<string, string> Read()
        {
            var d = new Dictionary<string, string>();

            // Read each line.
            FileStream fs = new FileStream("anagram.txt", FileMode.Open, FileAccess.Read);
            using (StreamReader r = new StreamReader(fs))
            {
                string line;
                while ((line = r.ReadLine()) != null)
                {
                    // Alphabetize the line for the key.
                    // Then add to the value string.
                    string a = Alphabetize(line);
                    string v;
                    if(d.TryGetValue(a, out v))
                    {
                        d[a] = v + ", " + line;
                    }
                    else
                    {
                        d.Add(a, line);
                    }
                }
            }
            return d;
        }

        static string Alphabetize(string s)
        {
            // convert to a char array, then sort and return
            char[] a = s.ToCharArray();
            Array.Sort(a);
            return new string(a);
        }

        static void Show(Dictionary<string, string> d, string w)
        {
            // Write value for alphabetized word
            string v;
            if(d.TryGetValue(Alphabetize(w), out v))
            {
                Console.WriteLine(v);
            }
            else
            {
                Console.WriteLine("-");
            }
        }
    }
}
