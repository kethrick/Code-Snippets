#include <cstring>

class PersistentString
{
private:
	char *str;
	bool stored;

public:
	PersistentString();
	~PersistentString();
	int GetLength() const;
	bool IsPalindrome() const;
	void Load();
	void Persist();
	bool operator == (const PersistentString &rhs);
	PersistentString& operator=(const char* rhs);
	PersistentString& operator = (const PersistentString &rhs);
	char &operator[](int i) const; 
	void PersistentString::toString();
};
