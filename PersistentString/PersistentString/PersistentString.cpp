#include <iostream>
#include <fstream>
#include <stdexcept>
#include <string>

#include "PersistentString.h"

using namespace std;


PersistentString::PersistentString()
{
	stored = false;
	str = nullptr;
}


PersistentString::~PersistentString()
{
	if (!stored)
	{
		Persist();
	}

	if (str != nullptr)
	{
		delete[] str;
		str = nullptr;
	}
}


int PersistentString::GetLength() const
{
	return strlen(str) - 1;
}


bool PersistentString::IsPalindrome() const
{
	int i = 0;
	int j = GetLength();

	if ((str == NULL) || (str[0] == '\0'))
	{
		return false;
	}

	while (i < j)
	{
		if (str[i] != str[j])
		{
			return false;
		}
		i++;
		j--;
	}
	return true;
}


void PersistentString::Load()
{
	if (str != nullptr)
	{
		delete[] str;
	}

	string temp;
	cout << "Enter a string: ";
	cin >> temp;

	this->str = new char[temp.size() + 1];
	std::copy(temp.begin(), temp.end(), this->str);
	this->str[temp.size()] = '\0'; // don't forget the terminating 0
}


void PersistentString::Persist()
{
	ofstream myfile;
	myfile.open("example.txt");
	myfile << str;
	myfile.close();
	stored = true;
}


bool PersistentString::operator == (const PersistentString &rhs)
{
	char* lhsStr = str;
	char* rhsStr = rhs.str;
	size_t lhsLength = this->GetLength();
	size_t rhsLength = rhs.GetLength();

	// If the strings are a different length they are not equal
	if (lhsLength != rhsLength)
	{
		return false;
	}

	// At this point the strings have the same length, so iterate through the
	// characters and ensure they are the same for both stringss.
	for (size_t i = 0; i < lhsLength; i++)
	{
		if (*lhsStr != *rhsStr)
		{
			return false;
		}

		lhsStr++;
		rhsStr++;
	}

	return true;
}


PersistentString& PersistentString::operator=(const char* rhs)
{
	if (str != nullptr) 
	{
		delete[] str;
	}

	if (rhs)
	{
		int rhsLength = strlen(rhs);
		str = new char[rhsLength + 1];
		strncpy(str, rhs, rhsLength);
		str[rhsLength] = '\0';
	}
	else
	{
		str = nullptr;
	}

	return *this;
}


PersistentString& PersistentString::operator = (const PersistentString &rhs)
{
	if (this != &rhs)
	{
		size_t rhsLength = rhs.GetLength();
		delete[] str;

		str = new char[rhsLength + 1];
		strncpy(str, rhs.str, rhsLength);
		str[rhsLength] = '\0';
	}

	return *this;
}


char &PersistentString::operator[](int i) const
{
	int length = GetLength();
	if (i < 0 || i >= length)
	{
		throw std::out_of_range("");
	}

	return *(str + i);
}

void PersistentString::toString()
{
	int length = GetLength();
	for (int i = 0; i <= length; i++)
	{
		cout << str[i];
	}
}
