const vscode = require('vscode');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function getNextLinePosition(position) {
    const nextLine = position.line + 1;
    return new vscode.Position(nextLine, 0);
}

function provideCodeLenses(document) {
    const codeLenses = [];
    const text = document.getText();

    // Check if the language is supported
    const supportedLanguages = ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'];
    if (!supportedLanguages.includes(document.languageId)) {
        return [
            new vscode.CodeLens(
                new vscode.Range(0, 0, 0, 0),
                {
                    command: "optimizationwithai.unsupportedLanguage",
                    title: "Language not yet supported",
                    arguments: [document.languageId]
                }
            )
        ];
    }

    const isTypeScript = document.languageId.includes('typescript');

    try {
        const ast = parser.parse(text, {
            sourceType: 'module',
            plugins: isTypeScript
                ? ['jsx', 'typescript', 'decorators-legacy']
                : ['jsx'],
        });

        traverse(ast, {
            FunctionDeclaration(node) {
                addCodeLens(node.node);
            },
            FunctionExpression(node) {
                addCodeLens(node.node);
            },
            ArrowFunctionExpression(node) {
                addCodeLens(node.node);
            },
            ClassMethod(node) {
                addCodeLens(node.node);
            },
        });
    } catch (error) {
        console.error('Failed to parse the document:', error);
    }

    function addCodeLens(node) {
        const startPos = document.positionAt(node.start);
        const endPos = document.positionAt(node.end);

        const adjustedEndPos = getNextLinePosition(endPos);

        codeLenses.push(new vscode.CodeLens(new vscode.Range(adjustedEndPos, adjustedEndPos), {
            command: "optimizationwithai.analyeComplexity",
            title: "Analyze Complexity",
            arguments: [document.getText(new vscode.Range(startPos, endPos))]
        }));

        codeLenses.push(new vscode.CodeLens(new vscode.Range(adjustedEndPos, adjustedEndPos), {
            command: "optimizationwithai.optimisecode",
            title: "Optimize with AI",
            arguments: [document.getText(new vscode.Range(startPos, endPos))]
        }));
    }

    return codeLenses;
}

module.exports = {
    provideCodeLenses
};