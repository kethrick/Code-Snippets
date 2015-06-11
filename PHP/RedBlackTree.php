<?php
/**
 * Red Black Tree
 * Holds implementation of red black sorting tree
 */

/**
 * Red-Black Tree Node class
 * This class represents a Red-Black tree node
 */
class RedBlackNode
{
    /**
     * COLOR_BLACK
     *
     * @var integer
     * @access public
     */
    const COLOR_BLACK = 0;

    /**
     * COLOR_RED
     *
     * @var integer
     * @access public
     */
    const COLOR_RED = 1;

    /**
     * Current color of the node
     *
     * @var integer
     * @access public
     */
    public $color = self::COLOR_BLACK;

    /**
     * Key
     *
     * @var mixed
     * @access public
     */
    public $key = null;

    /**
     * Info [aka value]
     *
     * @var mixed
     * @access public
     */
    public $value = null;

    /**
     * Left child of the node
     *
     * @var RedBlackNode
     * @access public
     */
    public $left = null;

    /**
     * Right child of the node
     *
     * @var RedBlackNode
     * @access public
     */
    public $right = null;

    /**
     * Parent of the node
     *
     * @var RedBlackNode
     * @access public
     */
    public $parent = null;
}

/**
 * Red-Black Tree class
 * This class holds the implementation for a Red-Black tree
 *
 * Usage:
 * create array of objects, arrays or values
 *
 * $tree = new RedBlackTree();
 * $tree->setOrder('desc'); //direction to sort on ASC or DESC
 * $tree->setLimit($maxNodes);
 * foreach($array as $key=>$value)
 * {
 *     $newNode = new RedBlackNode();
 *     $newNode->key = $valuer->thisIsTheValueToSortOn;
 *     $newNode->value = $value;
 *     $tree->insert($tree, $newNode);
 * }
 * $tree->getValues($tree, $return); // put the results in $return to be used else where
 */
class RedBlackTree
{
    /**
     * Enable debugging and debug messages
     *
     * @var boolean debug flag
     * @access protected
     */
    protected $DEBUG = false;

    /**
     * Root node of the tree
     *
     * @var RedBlackNode root of the tree
     * @access protected
     */
    protected $_root = null;

    /**
     * NIL node
     *
     * @var RedBlackNode node in the tree
     * @access protected
     */
    protected $_node = null;

    /**
     * Order for returning the tree values
     *
     *  @var string order the tree values will be returned in asc or desc
     *  @access protected
     */
    protected $_order = 'asc';

    /**
     * Current number of elements printed
     *
     * @var integer current number of items printed
     * @access protected
     */
    protected $_current;

    /**
     * Number of nodes we wish to print
     *
     * @var integer number of nodes we want to print
     * @access public
     */
    public $limit = 0;

    /**
     * Constructor
     *
     * @return RedBlackNode
     *
     * @access public
     */
    public function __construct()
    {
        $this->_node = new RedBlackNode();
        $this->_node->left = $this->_node->right = $this->_node->parent = $this->_node;
        $this->_root = $this->_node;
        return $this;
    }

    /**
     * Set the order for returning tree values asc or desc
     *
     * @param string $order order for returning tree values asc or desc
     *
     * @return RedBlackTree
     *
     * @access public
     */
    public function setOrder($order)
    {
        $order = strtolower($order);
        if($order == 'desc')
        {
            $this->_order = strtolower($order);
        }
        else
        {
            $this->_order = 'asc';
        }
        return $this;
    }

    /**
     * Set the number of nodes we want to print
     *
     * @param integer $limit number of nodes we want to print
     *
     * @return RedBlackTree
     *
     * @access public
     */
    public function setLimit($limit)
    {
        $this->limit = intval($limit);
        return $this;
    }

    /**
     * Check if a node is a NIL node
     *
     * @param  RedBlackTree $tree existing red-black tree
     * @param  RedBlackNode $x current node we are looking at
     *
     * @return boolean true if node is a nil Node
     *
     * @access public
     */
    public function isNil(RedBlackTree $tree, RedBlackNode $x)
    {
        return ($tree->_node === $x);
    }

    /**
     * Enable/disable DEBUG
     *
     * @param  boolean $debug indicates if debug is turned on
     *
     * @throws InvalidArgumentException
     *
     * @access public
     */
    public function setDebug($debug)
    {
        if(!is_bool($debug))
        {
            throw new InvalidArgumentException( __METHOD__.'() debug must be a boolean' );
        }

        $this->DEBUG = $debug;
    }

    /**
     * Insert a node to the red-black tree
     *
     * @param  RedBlackTree $tree existing tree we are inserting the node into
     * @param  RedBlackNode $x new node for the tree
     *
     * @return RedBlackNode New inserted node with child and parent nodes set
     *
     * @access public
     */
    public function insert(RedBlackTree $tree, RedBlackNode $x)
    {
        $this->_binaryTreeInsert($tree, $x);

        $newNode = $x;
        $x->color = RedBlackNode::COLOR_RED;
        while($x->parent->color === RedBlackNode::COLOR_RED)
        {
            if($x->parent === $x->parent->parent->left)
            {
                $y = $x->parent->parent->right;
                if($y->color === RedBlackNode::COLOR_RED)
                {
                    $x->parent->color = RedBlackNode::COLOR_BLACK;
                    $y->color = RedBlackNode::COLOR_BLACK;
                    $x->parent->parent->color = RedBlackNode::COLOR_RED;
                    $x = $x->parent->parent;
                }
                else
                {
                    if($x === $x->parent->right)
                    {
                        $x = $x->parent;
                        $this->_leftRotate($tree, $x);
                    }
                    $x->parent->color = RedBlackNode::COLOR_BLACK;
                    $x->parent->parent->color = RedBlackNode::COLOR_RED;
                    $this->_rightRotate($tree, $x->parent->parent);
                }
            }
            else
            {
                $y = $x->parent->parent->left;
                if($y->color === RedBlackNode::COLOR_RED)
                {
                    $x->parent->color = RedBlackNode::COLOR_BLACK;
                    $y->color = RedBlackNode::COLOR_BLACK;
                    $x->parent->parent->color = RedBlackNode::COLOR_RED;
                    $x = $x->parent->parent;
                }
                else
                {
                    if($x === $x->parent->left)
                    {
                        $x = $x->parent;
                        $this->_rightRotate($tree, $x);
                    }
                    $x->parent->color = RedBlackNode::COLOR_BLACK;
                    $x->parent->parent->color = RedBlackNode::COLOR_RED;
                    $this->_leftRotate($tree, $x->parent->parent);
                }
            }
        }

        $tree->_root->left->color = RedBlackNode::COLOR_BLACK;

        if($this->DEBUG)
        {
            assert($tree->_node->color === RedBlackNode::COLOR_BLACK);
            assert($tree->_root->color === RedBlackNode::COLOR_BLACK);
        }

        return $newNode;
    }

    /**
     * Find the successor of a given node
     *
     * @param  RedBlackTree $tree the existing tree we are trying to find the successor in
     * @param  RedBlackNode $x new node for the tree
     *
     * @return RedBlackNode Note that the returned node could be the RedBlackNode
     *                      which equals to tree->_node
     *
     * @access public
     */
    public function treeSuccessor(RedBlackTree $tree, RedBlackNode $x)
    {
        $node = $tree->_node;
        $root = $tree->_root;
        if(($y = $x->right) !== $node)
        {
            while($y->left !== $node)
            {
                $y = $y->left;
            }
            return $y;
        }
        else
        {
            $y = $x->parent;
            while($x === $y->right)
            {
                $x = $y;
                $y = $y->parent;
            }

            if($y === $root)
            {
                return $node;
            }

            return $y;
        }
    }

    /**
     * Find the predecessor of a given node
     *
     * @param  RedBlackTree $tree existing tree we are trying to find the predecessor in
     * @param  RedBlackNode $x node we are looking for
     *
     * @return RedBlackNode Note that the returned node could be the RedBlackNode
     *                      which equals to tree->_node
     *
     * @access public
     */
    public function treePredecessor(RedBlackTree $tree, RedBlackNode $x)
    {
        $node = $tree->_node;
        $root = $tree->_root;
        if(( $y = $x->left ) !== $node)
        {
            while($y->right !== $node)
            {
                $y = $y->right;
            }
            return $y;
        }
        else
        {
            $y = $x->parent;
            while($x === $y->left)
            {
                if($y === $root)
                {
                    return $node;
                }

                $x = $y;
                $y = $y->parent;
            }
            return $y;
        }
    }

    /**
     * Do an ascending order tree walk and print key/value
     *
     * @param  RedBlackTree $tree tree we are walking through
     * @param  RedBlackNode $x current node we are at
     * @param  string $func name of the function we are using to print the values
     *
     * @access private
     */
    private function _inAscOrderTreePrint(RedBlackTree $tree, RedBlackNode $x)
    {
        $node = $tree->_node;
        $root = $tree->_root;

        if($x !== $tree->_node)
        {
            $this->_inAscOrderTreePrint($tree, $x->left, $func);
            if($this->limit > $this->_current)
            {

                $this->_current++;
                $this->printNodeInfo($x, $node, $root);
            }
            $this->_inAscOrderTreePrint($tree, $x->right, $func);
        }
    }

    /**
     * Do a descending order tree walk and print key/value
     *
     * @param  RedBlackTree $tree tree we are walking through
     * @param  RedBlackNode $y current node we are at
     * @param  string $func name of the function we are using to print the values
     *
     * @access private
     */
    private function _inDescOrderTreePrint(RedBlackTree $tree, RedBlackNode $y, $func)
    {
        $node = $tree->_node;
        $root = $tree->_root;

        if($y !== $tree->_node)
        {
            $this->_inDescOrderTreePrint($tree, $y->right, $func);
            if($this->limit > $this->_current)
            {
                $this->_current++;
                $this->$func($y, $node, $root);
            }
            $this->_inDescOrderTreePrint($tree, $y->left, $func);
        }
    }

    /**
     * Print the key and values stored in a red-black tree
     *
     * @param  RedBlackTree $tree print the tree
     * @param  string $func name of the function we are using to print the values
     *
     * @access public
     */
    public function printTree(RedBlackTree $tree, $func)
    {
        $this->_current = 0;
        if($this->_order == 'desc')
        {
            if($tree->_root->right === $tree->_node)
            {
                $this->_inDescOrderTreePrint($tree, $tree->_root->left, $func);
            }
            else
            {
                $this->_inDescOrderTreePrint($tree, $tree->_root->right, $func);
            }
        }
        else
        {
            $this->_inAscOrderTreePrint($tree, $tree->_root->left, $func);
        }
    }

    /**
     * Find the highest [in the tree] matching node with a given key
     *
     * @param  RedBlackTree $tree tree we are searching
     * @param  mixed $q value we are searching for
     *
     * @return FALSE|RedBlackNode node with matching value or false if none found
     *
     * @access public
     */
    public function findKey(RedBlackTree $tree, $q)
    {
        $x = $tree->_root->left;
        $node = $tree->_node;

        if($x === $node)
        {
            return false;
        }

        $isEqual = $this->_compare($x->key, $q);

        while($isEqual !== 0)
        {
            if($isEqual === 1)
            {
                $x = $x->left;
            }
            else
            {
                $x = $x->right;
            }

            if($x === $node)
            {
                return false;
            }

            $isEqual = $this->_compare($x->key, $q);
        }

        return $x;
    }

    /**
     * Delete a node from the tree
     *
     * @param  RedBlackTree $tree existing tree we wish to delete node from
     * @param  RedBlackNode $node item we wish to remove from tree
     *
     * @access public
     */
    public function delete(RedBlackTree $tree, RedBlackNode $z)
    {
        $node = $tree->_node;
        $root = $tree->_root;

        if(($z->left === $node) || ($z->right === $node))
        {
            $y = $z;
        }
        else
        {
            $y = $this->treeSuccessor($tree, $z);
        }

        if($y->left === $node)
        {
            $x = $y->right;
        }
        else
        {
            $x = $y->left;
        }

        if($root === ($x->parent = $y->parent))
        {
            $root->left = $x;
        }
        else
        {
            if($y === $y->parent->left)
            {
                $y->parent->left = $x;
            }
            else
            {
                $y->parent->right = $x;
            }
        }

        if($y !== $z)
        {

            if($this->DEBUG)
            {
                assert($y !== $tree->_node);
            }

            if($y->color === RedBlackNode::COLOR_BLACK)
            {
                $this->_deleteFixUp($tree, $x);
            }

            $y->left = $z->left;
            $y->right = $z->right;
            $y->parent = $z->parent;
            $y->color = $z->color;
            $z->left->parent = $z->right->parent = $y;

            if($z === $z->parent->left)
            {
                $z->parent->left = $y;
            }
            else
            {
                $z->parent->right = $y;
            }
            $z = null;
            unset($z);
        }
        else
        {
            if($y->color === RedBlackNode::COLOR_BLACK)
            {
                $this->_deleteFixUp( $tree, $x );
            }

            $y = null;
            unset($y);
        }

        if($this->DEBUG)
        {
            assert($tree->_node->color === RedBlackNode::COLOR_BLACK);
        }
    }

    /**
     * Get an enumeration of RedBlackNode between low and high values inclusive
     *
     * @param  RedBlackTree $tree existing tree we are searching
     * @param  mixed $low lowest value we are looking for
     * @param  mixed $high highest value we are looking for
     *
     * @return array list of node between low and high values
     *
     * @access public
     */
    public function enumerate(RedBlackTree $tree, $low, $high)
    {
        $return = array();
        $node = $tree->_node;
        $x = $tree->_root->left;
        $lastBest = $node;
        while($x !== $node)
        {
            if($this->_compare($x->key, $high) === 1)
            {
                $x = $x->left;
            }
            else
            {
                $lastBest = $x;
                $x = $x->right;
            }
        }

        while(($lastBest !== $node) && ($this->_compare($low, $lastBest->key) !== 1))
        {
            array_push($return, $lastBest->value);
            $lastBest = $this->treePredecessor($tree, $lastBest);
        }

        if($this->_order !== 'desc')
        {
            $return = array_reverse($return);
        }
        return $return;
    }

    /**
     * Do a left rotate on a given tree with pivot node x
     *
     * @param  RedBlackTree $tree existing tree we are manipulating
     * @param  RedBlackNode $x node we are pivotting
     *
     * @access private
     */
    private function _leftRotate(RedBlackTree $tree, RedBlackNode $x)
    {
        $node = $tree->_node;

        $y = $x->right;
        $x->right = $y->left;

        if($y->left !== $node)
        {
            $y->left->parent = $x;
        }

        $y->parent = $x->parent;

        if($x === $x->parent->left)
        {
            $x->parent->left = $y;
        }
        else
        {
            $x->parent->right = $y;
        }

        $y->left = $x;
        $x->parent = $y;

        if($this->DEBUG)
        {
            assert($tree->_node->color === RedBlackNode::COLOR_BLACK);
        }
    }

    /**
     * Do a right rotate on a given tree with pivot node y
     *
     * @param  RedBlackTree $tree existing tree we are manipulating
     * @param  RedBlackNode $y node we are pivotting on
     *
     * @access private
     */
    private function _rightRotate(RedBlackTree $tree, RedBlackNode $y)
    {
        $node = $tree->_node;

        $x = $y->left;
        $y->left = $x->right;

        if($x->right !== $node)
        {
            $x->right->parent = $y;
        }

        $x->parent = $y->parent;

        if($y === $y->parent->left)
        {
            $y->parent->left = $x;
        }
        else
        {
            $y->parent->right = $x;
        }

        $x->right = $y;
        $y->parent = $x;

        if($this->DEBUG)
        {
            assert($tree->_node->color === RedBlackNode::COLOR_BLACK);
        }
    }

    /**
     * Do a binary tree insert
     *
     * @param  RedBlackTree $tree existing tree we are inserting into
     * @param  RedBlackNode $z node we are inserting
     *
     * @access private
     */
    private function _binaryTreeInsert(RedBlackTree $tree, RedBlackNode $z)
    {
        $node = $tree->_node;

        // Even though at instantiation, these are set to nil - make sure they still are ;-)
        $z->left = $z->right = $node;

        $y = $tree->_root;
        $x = $tree->_root->left;

        while($x !== $node)
        {
            $y = $x;
            if($this->_compare($x->key, $z->key) === 1)
            {
                $x = $x->left;
            }
            else
            {
                $x = $x->right;
            }
        }

        $z->parent = $y;

        if(($y === $tree->_root) || ($this->_compare($y->key, $z->key) === 1))
        {
            $y->left = $z;
        }
        else
        {
            $y->right = $z;
        }

        if($this->DEBUG)
        {
            assert($tree->_node->color === RedBlackNode::COLOR_BLACK);
        }
    }

    /**
     * DeleteFixUp
     *
     * @param  RedBlackTree $tree existing tree we need to fix
     * @param  RedBlackNode $x node we need to start fixing at
     *
     * @access private
     */
    private function _deleteFixUp(RedBlackTree $tree, RedBlackNode $x)
    {
        $root = $tree->_root->left;

        while(($x->color === RedBlackNode::COLOR_BLACK) && ($root !== $x))
        {
            if($x === $x->parent->left)
            {
                $w = $x->parent->right;
                if($w->color === RedBlackNode::COLOR_RED)
                {
                    $w->color = RedBlackNode::COLOR_BLACK;
                    $x->parent->color = RedBlackNode::COLOR_RED;
                    $this->_leftRotate($tree, $x->parent);
                    $w = $x->parent->right;
                }

                if(($w->right->color === RedBlackNode::COLOR_BLACK) &&
                   ($w->left->color === RedBlackNode::COLOR_BLACK))
                {
                    $w->color = RedBlackNode::COLOR_RED;
                    $x = $x->parent;
                }
                else
                {
                    if($w->right->color === RedBlackNode::COLOR_BLACK)
                    {
                        $w->left->color = RedBlackNode::COLOR_BLACK;
                        $w->color = RedBlackNode::COLOR_RED;
                        $this->_rightRotate($tree, $w);
                        $w = $x->parent->right;
                    }
                    $w->color = $x->parent->color;
                    $x->parent->color = RedBlackNode::COLOR_BLACK;
                    $w->right->color = RedBlackNode::COLOR_BLACK;
                    $this->_leftRotate($tree, $x->parent);
                    $x = $root;
                }
            }
            else
            {
                $w = $x->parent->left;
                if($w->color === RedBlackNode::COLOR_RED)
                {
                    $w->color = RedBlackNode::COLOR_BLACK;
                    $x->parent->color = RedBlackNode::COLOR_RED;
                    $this->_rightRotate($tree, $x->parent);
                    $w = $x->parent->left;
                }

                if(($w->right->color === RedBlackNode::COLOR_BLACK) &&
                   ($w->left->color === RedBlackNode::COLOR_BLACK))
                {
                    $w->color = RedBlackNode::COLOR_RED;
                    $x = $x->parent;
                }
                else
                {
                    if($w->left->color === RedBlackNode::COLOR_BLACK)
                    {
                        $w->right->color = RedBlackNode::COLOR_BLACK;
                        $w->color = RedBlackNode::COLOR_RED;
                        $this->_leftRotate($tree, $w);
                        $w = $x->parent->left;
                    }
                    $w->color = $x->parent->color;
                    $x->parent->color = RedBlackNode::COLOR_BLACK;
                    $w->left->color = RedBlackNode::COLOR_BLACK;
                    $this->_rightRotate($tree, $x->parent);
                    $x = $root;
                }
            }
        }
        $x->color = RedBlackNode::COLOR_BLACK;

        if($this->DEBUG)
        {
            assert($tree->_node->color === RedBlackNode::COLOR_BLACK);
        }
    }

    /**
     * Compare two values
     *
     * !! WARNING !! If this method is not overridden, then
     * all the keys should either be numeric or not a numeric,
     * otherwise a valid tree can not be formed, since string
     * comparison would not make sense on integers e.g strcmp("3","10").
     * In addition, values can not be compared in a mixed fashion
     * i.e. some values compared using string comparison, and
     * others using numeric comparison
     *
     * @param  mixed $key1 first key to compare
     * @param  mixed $key2 second key to compare
     *
     * @return integer Return integer 1, if key1 is greater than key2
     *                        integer 0, if key1 is equal to key2
     *                        integer -1, if key1 is less than key2
     *
     * @throws InvalidArgumentException
     *
     * @access private
     */
    private function _compare($key1, $key2)
    {
        if(!is_scalar($key1) || is_bool($key1) || !is_scalar($key2) || is_bool($key2))
        {
            throw new InvalidArgumentException( __METHOD__.'() keys must be a string or numeric' );
        }

        $returnValue = null;

        switch(true)
        {
            case (is_numeric($key1) && is_numeric($key2)):
                if ( $key1 > $key2 )
                {
                    $returnValue = 1;
                }
                else
                {
                    $returnValue = ($key1 === $key2) ? 0 : -1;
                }
                break;
            case (is_string($key1) && is_string($key2)):
                $returnValue = strcmp("$key1", "$key2");
                break;
            default:
                $key1 = (string)$key1;
                $key2 = (string)$key2;
                $returnValue = strcmp("$key1", "$key2");
                break;
        }

        // make sure these are the exact return values, even though PHP seems to always return
        // -1,0,1 but the documentation does not explicity say it
        if(intval($returnValue) > 0)
        {
            return 1;
        }
        elseif(intval($returnValue) < 0)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }

    /**
     * Get the key and values stored in a red-black tree
     *
     * @param  RedBlackTree $tree existing tree we want the values from
     * @param  array $values array to hold the values
     *
     * @access public
     */
    public function getValues(RedBlackTree $tree, &$values)
    {
        $this->_current = 0;
        if($this->_order == 'desc')
        {
            if($tree->_root->right === $tree->_node)
            {
                $this->_inDescOrderTreeValues($tree, $tree->_root->left, $values);
            }
            else
            {
                $this->_inDescOrderTreeValues($tree, $tree->_root->right, $values);
            }
        }
        else
        {
            $this->_inAscOrderTreeValues($tree, $tree->_root->left, $values);
        }
    }

    /**
     * Do an ascending order tree walk and get key/value
     *
     * @param  RedBlackTree $tree tree we are walking through
     * @param  RedBlackNode $x current node we are at
     * @param  array $values array to hold the values
     *
     * @access private
     */
    private function _inAscOrderTreeValues(RedBlackTree $tree, RedBlackNode $x, &$values)
    {
        $node = $tree->_node;
        $root = $tree->_root;

        if($x !== $tree->_node)
        {
            $this->_inAscOrderTreeValues($tree, $x->left, $values);
            if($this->limit > $this->_current)
            {
                $this->_current++;
                array_push($values, $x->value);
            }
            $this->_inAscOrderTreeValues($tree, $x->right, $values);
        }
    }

    /**
     * Do a descending order tree walk and get key/value
     *
     * @param  RedBlackTree $tree tree we are walking through
     * @param  RedBlackNode $y current node we are at
     * @param  array $values array to hold the values
     *
     * @access private
     */
    private function _inDescOrderTreeValues(RedBlackTree $tree, RedBlackNode $y, &$values)
    {
        $node = $tree->_node;
        $root = $tree->_root;

        if($y !== $tree->_node)
        {
            $this->_inDescOrderTreeValues($tree, $y->right, $values);
            if($this->limit > $this->_current)
            {
                $this->_current++;
                array_push($values, $y->value);
            }
            $this->_inDescOrderTreeValues($tree, $y->left, $values);
        }
    }

    /**
     * Print the node information
     *
     * @param  RedBlackNode $current the node we are currently at
     * @param  RedBlackNode $node node for comparision
     * @param  RedBlackNode $root root of the current node
     */
    public function printNodeInfo(RedBlackNode $current, RedBlackNode $node, RedBlackNode $root)
    {
        echo "line= $this->_current  info=  key=".var_export($current->key, true);

        echo "  l->key=";
        if($current->left === $node)
        {
            echo "NULL";
        }
        else
        {
            echo var_export($current->left->key, true);
        }

        echo "  r->key=";
        if($current->right === $node)
        {
            echo "NULL";
        }
        else
        {
            echo var_export($current->right->key, true);
        }

        echo "  p->key=";
        if($current->parent === $root)
        {
            echo "NULL";
        }
        else
        {
            echo var_export($current->parent->key, true);
        }

        echo "  red=";
        if($current->color === RedBlackNode::COLOR_RED)
        {
            echo "1";
        }
        else
        {
            echo "0";
        }

        echo "  value=";
        echo var_export($current->value, true);

        echo "\n";
    }
}
