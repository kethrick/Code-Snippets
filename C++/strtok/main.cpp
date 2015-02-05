#include <iostream>

using std::cout;
using std::cin;
using std::printf;

#include <stdio.h>

char * strtok(char * s, char *comp);

void main()
{
	char s[100], *p, delimit[20];
	int i=0, len=0;
	cout << "Enter the input string \n";
	gets_s(s);  
	cout << "Enter the delimiter string \n";
	gets_s(delimit);

	while(len++ != '\0');
	p = strtok(s,delimit);	
	while(p != NULL)
	{
		printf("%s \n", p);
		p = strtok(NULL, delimit);			
	}
	cout << "Press 1 to exit \n";
	cin >> s;
}
char * strtok(char * str, char *comp)
{
	static int pos;
	static char *s;	
	int i =0, start = pos;

	// Copying the string for further calls of strtok
	if(str!=NULL)
		s = str;
	
	i = 0;
	int j = 0;
	//While not end of string
	while(s[pos] != '\0')
	{
		j = 0;	
		//Comparing of one of the delimiter matches the character in the string
		while(comp[j] != '\0')
		{		
			//Pos point to the next location in the string that we have to read
			if(s[pos] == comp[j])
			{
				//Replace the delimter by \0 to break the string
				s[pos] = '\0';
				pos = pos+1;				
				//Checking for the case where there is no relevant string before the delimeter.
				//start specifies the location from where we have to start reading the next character
				if(s[start] != '\0')
					return (&s[start]);
				else
				{
					// Move to the next string after the delimiter
					start = pos;
					// Decrementing as it will be incremented at the end of the while loop
					pos--;
					break;
				}
			}
			j++;
		}
		pos++;		
	}//End of Outer while
	s[pos] = '\0';
	if(s[start] == '\0')
		return NULL;
	else
		return &s[start];
}