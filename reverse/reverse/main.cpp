#include <iostream>

using std::cin;
using std::cout;

#include <stdio.h>
#include <string>

void ReverseSentence(char *pData);
void Reverse(char *pBegin, char *pEnd);

int main()
{
	char s[100];
	cout << "Enter string to reverse \n";
	gets_s(s);

	ReverseSentence(s);
	cout << s;

	cout << "\nPres any key to exit \n";
	cin >> s;

	return 1;
}

void ReverseSentence(char *pData)
{
    if(pData == NULL)
        return;

    char *pBegin = pData;

    char *pEnd = pData;
    while(*pEnd != '\0')
        pEnd ++;
    pEnd--;

    // Reverse the whole sentence
    Reverse(pBegin, pEnd);

    // Reverse every word in the sentence
    pBegin = pEnd = pData;
    while(*pBegin != '\0')
    {
        if(*pBegin == ' ')
        {
            pBegin ++;
            pEnd ++;
        }
        else if(*pEnd == ' ' || *pEnd == '\0')
        {
            Reverse(pBegin, --pEnd);
            pBegin = ++pEnd;
        }
        else
        {
            pEnd ++;
        }
    }
}

void Reverse(char *pBegin, char *pEnd)
{
    if(pBegin == NULL || pEnd == NULL)
        return;

    while(pBegin < pEnd)
    {
        char temp = *pBegin;
        *pBegin = *pEnd;
        *pEnd = temp;

        pBegin ++, pEnd --;
    }
}