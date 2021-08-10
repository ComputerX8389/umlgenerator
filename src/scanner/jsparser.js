const ops = {
    ADD: "+",
    SUB: "-",
    MUL: "*",
    DIV: "/",
};
let globalScope = new Map();
class Visitor {
    visitVariableDeclaration(node) {
        const nodeKind = node.kind;
        return this.visitNodes(node.declarations);
    }
    visitVariableDeclarator(node) {
        const id = this.visitNode(node.id);
        const init = this.visitNode(node.init);
        globalScope.set(id, init);
        return init;
    }
    visitIdentifier(node) {
        const name = node.name;
        if (globalScope.get(name)) return globalScope.get(name);
        else return name;
    }
    visitLiteral(node) {
        return node.raw;
    }
    visitBinaryExpression(node) {
        const leftNode = this.visitNode(node.left);
        const operator = node.operator;
        const rightNode = this.visitNode(node.right);
        switch (operator) {
            case ops.ADD:
                return leftNode + rightNode;
            case ops.SUB:
                return leftNode - rightNode;
            case ops.DIV:
                return leftNode / rightNode;
            case ops.MUL:
                return leftNode * rightNode;
        }
    }
    evalArgs(nodeArgs) {
        let g = [];
        for (const nodeArg of nodeArgs) {
            g.push(this.visitNode(nodeArg));
        }
        return g;
    }
    visitCallExpression(node) {
        const callee = this.visitIdentifier(node.callee);
        const _arguments = this.evalArgs(node.arguments);
        if (callee == "print") console.log(..._arguments);
    }
    visitNodes(nodes) {
        for (const node of nodes) {
            this.visitNode(node);
        }
    }
    visitNode(node) {
        switch (node.type) {
            case "VariableDeclaration":
                return this.visitVariableDeclaration(node);
            case "VariableDeclarator":
                return this.visitVariableDeclarator(node);
            case "Literal":
                return this.visitLiteral(node);
            case "Identifier":
                return this.visitIdentifier(node);
            case "BinaryExpression":
                return this.visitBinaryExpression(node);
            case "CallExpression":
                return this.visitCallExpression(node);
        }
    }
    run(nodes) {
        return this.visitNodes(nodes);
    }
}

class Interpreter {
    constructor(visitor) {
        this.visitor = visitor;
    }
    interpret(nodes) {
        return this.visitor.run(nodes);
    }
}

module.exports = {
    Visitor,
    Interpreter,
};
