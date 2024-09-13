const vscode = require('vscode');
const axios = require('axios');
const ApiResponseWebviewProvider = require('./ApiResponseWebviewProvider');
const { provideCodeLenses } = require('./CodeLensProvider');
let gotApiResponse = false;

let apiResponseProvider;
let isInitialized = false;

function activate(context) {
    apiResponseProvider = new ApiResponseWebviewProvider();

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('optimizationwithai.apiResponseView', apiResponseProvider)
    );

    context.subscriptions.push(
        vscode.languages.registerCodeLensProvider(
            { scheme: 'file', language: 'javascript' },
            { provideCodeLenses }
        )
    );

    context.subscriptions.push(
        vscode.languages.registerCodeLensProvider(
            { scheme: 'file', language: 'javascriptreact' },
            { provideCodeLenses }
        )
    );
    context.subscriptions.push(vscode.languages.registerCodeLensProvider({ scheme: 'file', language: 'typescript' }, {
        provideCodeLenses
    }));

    context.subscriptions.push(
        vscode.commands.registerCommand('optimizationwithai.analyeComplexity', analyzeComplexity)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('optimizationwithai.optimisecode', optimizeCode)
    );

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(handleTextDocumentOpen)
    );

    if (vscode.window.activeTextEditor) {
        handleTextDocumentOpen(vscode.window.activeTextEditor.document);
    }
}

function displayWelcomeMessage() {
    apiResponseProvider.updateContent("# Welcome to DevMate!\n\n");
    apiResponseProvider.updateContent("I'm here to help you analyze and optimize your code.\n");
    apiResponseProvider.updateContent("Open a JavaScript or JSX file to get started.\n\n");
    apiResponseProvider.updateContent("-----------------------------------------------\n\n");
}

function displayNotSupportedMessage() {
    apiResponseProvider.updateContent("# Welcome to DevMate!\n\n");
    apiResponseProvider.updateContent("I'm here to help you analyze and optimize your code.\n");
    apiResponseProvider.updateContent("Currently, we only support JavaScript and TypeScript.\n");
    apiResponseProvider.updateContent("Open a JavaScript or TypeScript file to get started.\n\n");
    apiResponseProvider.updateContent("-----------------------------------------------\n\n");
}

async function analyzeComplexity(functionCode) {
    await showDevMateView();
    await makeApiCall("Calculate time and space complexity for this code, just give me answer in one line saying: The Time and Space Complexity of your code is: {result} \n\n", functionCode);
}

async function optimizeCode(functionCode) {
    await showDevMateView();
    await makeApiCall("Optimize the below code and return the optimized code with explanations: \n\n", functionCode);
}

async function showDevMateView() {
    await vscode.commands.executeCommand('optimizationwithai.apiResponseView.focus');
}

async function makeApiCall(prompt, functionCode) {
    try {
        apiResponseProvider.updateContent("Processing request...\n\n");
        
        const promptData = prompt + functionCode;
        const response = await axios.post('https://d0df-114-143-107-6.ngrok-free.app/generate', {
            prompt: promptData
        }, {
            responseType: 'stream'
        });

        response.data.on('data', (chunk) => {
            const newContent = chunk.toString();
            apiResponseProvider.updateContent(newContent);
        });

        response.data.on('end', () => {
            apiResponseProvider.updateContent("\n\n-------------END-----------\n\n");
        });

    } catch (error) {
        vscode.window.showErrorMessage(`API call failed: ${error.message}`);
        apiResponseProvider.updateContent(`Error: ${error.message}\n\n`);
    }
}

function handleTextDocumentOpen(document) {
    if (!isInitialized && (document.languageId === 'javascript' || document.languageId === 'javascriptreact' || document.languageId === 'typescript')) {
        vscode.commands.executeCommand('vscode.executeCodeLensProvider');
        apiResponseProvider.updateContent("## Dev Mate AI is ready to analyze your code.\n\n");
        apiResponseProvider.updateContent("We are currently supporting JS frameworks, and open for contributions, visit [Github](https://github.com) for more information.\n\n");
        isInitialized = true;
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};