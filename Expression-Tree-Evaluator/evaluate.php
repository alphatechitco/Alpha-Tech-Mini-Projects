<?php

class TreeNode {
    public $val;
    public $left;
    public $right;
    
    public function __construct($val) {
        $this->val = $val;    //Constructor for new Node
        $this->left = null;
        $this->right = null;
    }
}

class Solution {
    public function evaluateExpressionTree($root) {
        if ($root == null) {
            return 0;
        }

        if ($root->left == null && $root->right == null) {
            return intval($root->val);   //Leaf Nodes Handling
        }

        $leftVal = $this->evaluateExpressionTree($root->left);
        $rightVal = $this->evaluateExpressionTree($root->right);

        switch ($root->val) {
            case '+':
                return $leftVal + $rightVal;      //Using Switch/If Statement
            case '-':
                return $leftVal - $rightVal;
            case '*':
                return $leftVal * $rightVal;
            case '/':
                return $leftVal / $rightVal;
        }

        return 0;
    }

    public function buildExpressionTree($expression) {
        $tokens = str_split($expression);
        $nodes = [];
        $ops = [];
        
        foreach ($tokens as $token) {
            if (is_numeric($token)) {
                array_push($nodes, new TreeNode($token));
            } elseif ($token == '(') {         //Separating Operands and Operators
                array_push($ops, $token);
            } elseif ($token == ')') {
                while (end($ops) != '(') {
                    $this->buildSubTree($nodes, $ops);
                }
                array_pop($ops); // Remove '('
            } elseif ($this->isOperator($token)) {
                while (!empty($ops) && $this->precedence(end($ops)) >= $this->precedence($token)) {
                    $this->buildSubTree($nodes, $ops);
                }
                array_push($ops, $token);
            }
        }

        while (!empty($ops)) {
            $this->buildSubTree($nodes, $ops);
        }

        return end($nodes);
    }

    private function isOperator($c) {
        return in_array($c, ['+', '-', '*', '/']);    //Confirming Operator or Operand
    }

    private function precedence($op) {
        switch ($op) {
            case '+':
            case '-':
                return 1;      //Handling DMAS Rule
            case '*':
            case '/':
                return 2;
            default:
                return 0;
        }
    }

    private function buildSubTree(&$nodes, &$ops) {
        $right = array_pop($nodes);
        $left = array_pop($nodes);
        $opNode = new TreeNode(array_pop($ops));
        $opNode->left = $left;
        $opNode->right = $right;
        array_push($nodes, $opNode);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');      //Handling Request 

    $expression = $_POST['expression'];

    $solution = new Solution();
    $root = $solution->buildExpressionTree($expression);
    $result = $solution->evaluateExpressionTree($root);

    echo json_encode([
        'result' => $result,
        'tree' => $root
    ]);
}


// ************** ALPHA TECH SOLUTIONS (Expression Evaluation) ****************
