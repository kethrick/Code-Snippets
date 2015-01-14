#include "PersistentString.h"

#include <iostream>
#include <stdexcept>

using namespace std;

int main()
{
	PersistentString data;

	data.Load();

	try
	{
		cout << "output: " << data[0] << endl;
	}
	catch (const std::out_of_range& ex)
	{
		cout << "Out of Range error: " << ex.what() << endl;
	}
	if (data.IsPalindrome())
	{
		data.toString();
		cout << " is a pallindrome." << endl;
	}
	else
	{
		data.toString();
		cout << " is not a pallindrome." << endl;
	}
	data.Persist();

	cout << "Press any key to exit.";
	char thingy;
	cin >> thingy;
	return 0;
}