/**
printLevelorder(tree)
1) Create an empty queue q
2) temp_node = root --start from root--
3) Loop while temp_node is not NULL
    a) print temp_node->data.
    b) Enqueue temp_node’s children (first left then right children) to q
    c) Dequeue a node from q and assign it’s value to temp_node
**/
#include<stdio.h>
#include<stdlib.h>

struct tree_node
{
    int data;
    struct tree_node* left;
    struct tree_node* right;
};

struct node
{
    struct tree_node* t_ref;
    struct node* next;
};

void printLevelOrder(struct tree_node* root,struct node** front,struct node** rear)
{
	struct node* temp,*curr;
    if(root == NULL)
    {
        return;
    }

    struct node* node = (struct node*)malloc(sizeof(struct node));
    node->t_ref = root;
    node->next = NULL;
    (*rear) = node; (*front) = node;

    while((*front))
    {
        temp = (*front);
        if(temp->t_ref->left != NULL)
        {
            struct node* node = (struct node*)malloc(sizeof(struct node));
            node->t_ref = temp->t_ref->left;
            node->next = NULL;
            (*rear)->next = node;
            (*rear) = node;
        }

        if(temp->t_ref->right != NULL)
        {
            struct node* node = (struct node*)malloc(sizeof(struct node));
            node->t_ref = temp->t_ref->right;
            node->next = NULL;
            (*rear)->next = node;
            (*rear) = node;
        }
        printf("\t %d",temp->t_ref->data);
        (*front)=temp->next;
    }
}

struct tree_node* newNode(int data)
{
    struct tree_node* node = (struct tree_node*)malloc(sizeof(struct tree_node));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return (node);
}

int main()
{
    struct node *rear,*front;
    rear = NULL;front = NULL;
    struct tree_node *root = newNode(1);
    root->left = newNode(6);
    root->right = newNode(3);
    root->left->left = newNode(7);
    root->left->right = newNode(2);
    root->right->left = newNode(4);
    root->right->right = newNode(5);
    printf("Level Order traversal of binary tree is \n");
    printLevelOrder(root,&front,&rear);
    getchar();
    return 0;
}