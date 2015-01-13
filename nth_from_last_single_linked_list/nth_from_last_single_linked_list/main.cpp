#include <iostream> 
using namespace std;

// Node class 
class Node 
{ 
	int data; 
	Node* next; 
public: 
	Node() {}; 
	void SetData(int aData) { data = aData; }; 
	void SetNext(Node* aNext) { next = aNext; }; 
	int Data() { return data; }; 
	Node* Next() { return next; }; 
}; 

// List class 
class List {
	Node *head;
public:
	List() { head = NULL; };
	void Print();
	void Append(int data);
	Node* GetFirstNode();
	Node* GetNextNode(Node* node);
	Node* GetNth(int nth);
};

/** * Print the contents of the list */ 
void List::Print() 
{ 
	// Temp pointer 
	Node *tmp = head; 
	// No nodes 
	if ( tmp == NULL ) 
	{ 
		cout << "EMPTY" << endl; 
		return; 
	} 
	// One node in the list 
	if ( tmp->Next() == NULL ) 
	{ 
		cout << tmp->Data(); 
		cout << " --> "; 
		cout << "NULL" << endl; 
	} 
	else 
	{ 
		// Parse and print the list 
		do 
		{ 
			cout << tmp->Data(); 
			cout << " --> "; 
			tmp = tmp->Next(); 
		} while ( tmp != NULL ); 
		cout << "NULL" << endl; 
	} 
} 

/** * Append a node to the linked list */ 
void List::Append(int data) 
{ 
	// Create a new node 
	Node* newNode = new Node(); 
	newNode->SetData(data); 
	newNode->SetNext(NULL); 
	// Create a temp pointer 
	Node *tmp = head; 
	if ( tmp != NULL ) 
	{ 
		// Nodes already present in the list 
		// Parse to end of list 
		while ( tmp->Next() != NULL ) 
		{ 
			tmp = tmp->Next(); 
		} 
		// Point the last node to the new node 
		tmp->SetNext(newNode); 
	} 
	else 
	{ 
		// First node in the list 
		head = newNode; 
	} 
}

/* Get the first node in the list*/
Node* List::GetFirstNode()
{
	return head;
}

/* Get the next node in the list*/
Node* List::GetNextNode(Node* node)
{
	// One node in the list 
	if (node->Next() == NULL)
	{
		return NULL;
	}
	else
	{
		return node->Next();
	}
}

/* Get the nth node from the ned of the list */
Node* List::GetNth(int nth)
{
	Node *p1 = GetFirstNode();
	Node *p2 = GetFirstNode();
	for (int j = 0; j < (nth - 1); j++)
	{
		// make them n nodes apart.
		if (p2->Next() == NULL)
		{
			return NULL;
		}
		p2 = GetNextNode(p2);
	}

	while (p2->Next() != NULL)
	{
		// move till p2 goes past the end of the list.
		p1 = GetNextNode(p1);
		p2 = GetNextNode(p2);
	}

	return p1;
}

int main() 
{ 
	int nth;
	int thing;

	nth = 5;

	// New list 
	List list; 
	// Append nodes to the list 
	list.Append(100); 
	list.Append(200); 
	list.Append(300);
	list.Print();

	Node *n = list.GetNth(nth);
	cout << "Test 1 should be NULL" << endl;

	if (n == NULL)
	{
		cout << "list not long enough " << nth << "th not found " << endl;
	}
	else
	{
		cout << "nth node is " << n->Data() << endl;
	}

	list.Append(400); 
	list.Append(500); 
	list.Print(); 

	n = list.GetNth(nth);
	cout << "Test 2 should be 100" << endl;
	if (n == NULL)
	{
		cout << "list not long enough " << nth << "th not found " << endl;
	}
	else
	{
		cout << "nth node is " << n->Data() << endl;
	}
	list.Append(600);
	list.Append(700);
	list.Print();

	n = list.GetNth(nth);
	cout << "Test 3 should be 300" << endl;
	if (n == NULL)
	{
		cout << "list not long enough " << nth << "th not found " << endl;
	}
	else
	{
		cout << "nth node is " << n->Data() << endl;
	}
	cin >> thing;
}