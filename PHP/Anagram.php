<?php

class Anagram
{
    private $_anagrams = array();

    public function __construct()
    {
        $this->_anagrams = array();
    }

    public function isAnagram($string)
    {
        $key = $this->_createKey($string);

        if($this->_keyExists($key))
        {
            if($this->_valueExits($key, $string))
            {
                print 'Anagram found, string "' . $string . '" already exits in list' . "\n";
                return true;
            }
            else
            {
                $this->_addAnagram($key, $string);
                print 'Anagram found, adding string "' . $string . '" to  list' . "\n";
                return true;
            }
        }
        else
        {
            $this->_addAnagram($key, $string);
            print 'Anagram not found, adding new anagram "' . $string . '" to list' . "\n";
            return false;
        }
    }

    private function _createKey($string)
    {
        $array = str_split($string);
        sort($array);
        return implode('', $array);
    }

    private function _keyExists($key)
    {
        if(isset($this->_anagrams[$key]))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private function _valueExits($key, $string)
    {
        if(in_array($string, $this->_anagrams[$key]))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private function _addAnagram($key, $string)
    {
        if(!isset($this->_anagrams[$key]))
        {
            $this->_anagrams[$key] = array();
        }
        $this->_anagrams[$key][] = $string;
    }
}

$anagram = new Anagram();

$string1 = 'abc';
$string2 = 'bac';
$string3 = "red";

$anagram->isAnagram($string1);
$anagram->isAnagram($string2);
$anagram->isAnagram($string2);
$anagram->isAnagram($string3);

