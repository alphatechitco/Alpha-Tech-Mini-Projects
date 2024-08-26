const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    evaluateExpressionTree(root) {
        if (!root) return 0;
        if (!root.left && !root.right) return parseInt(root.val, 10);

        const leftVal = this.evaluateExpressionTree(root.left);
        const rightVal = this.evaluateExpressionTree(root.right);

        switch (root.val) {
            case '+': return leftVal + rightVal;
            case '-': return leftVal - rightVal;
            case '*': return leftVal * rightVal;
            case '/': return leftVal / rightVal;
        }
        return 0;
    }

    buildExpressionTree(expression) {
        const tokens = expression.split('');
        const nodes = [];
        const ops = [];

        tokens.forEach(token => {
            if (!isNaN(token)) {
                nodes.push(new TreeNode(token));
            } else if (token === '(') {
                ops.push(token);
            } else if (token === ')') {
                while (ops[ops.length - 1] !== '(') {
                    this.buildSubTree(nodes, ops);
                }
                ops.pop();
            } else if (this.isOperator(token)) {
                while (ops.length && this.precedence(ops[ops.length - 1]) >= this.precedence(token)) {
                    this.buildSubTree(nodes, ops);
                }
                ops.push(token);
            }
        });

        while (ops.length) {
            this.buildSubTree(nodes, ops);
        }

        return nodes.pop();
    }

    isOperator(c) {
        return ['+', '-', '*', '/'].includes(c);
    }

    precedence(op) {
        switch (op) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            default:
                return 0;
        }
    }

    buildSubTree(nodes, ops) {
        const right = nodes.pop();
        const left = nodes.pop();
        const opNode = new TreeNode(ops.pop());
        opNode.left = left;
        opNode.right = right;
        nodes.push(opNode);
    }
}

app.post('/evaluate', (req, res) => {
    const { expression } = req.body;
    const solution = new Solution();
    const root = solution.buildExpressionTree(expression);
    const result = solution.evaluateExpressionTree(root);
    res.json({ result, tree: root });
});

module.exports = app;
