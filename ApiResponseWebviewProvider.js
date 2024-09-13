const vscode = require('vscode');

class ApiResponseWebviewProvider {
    constructor() {
        this._onDidDispose = new vscode.EventEmitter();
        this.onDidDispose = this._onDidDispose.event;
        this._webviewView = null;
        this._currentContent = '';
    }

    resolveWebviewView(webviewView, context, token) {
        this._webviewView = webviewView;
        webviewView.webview.options = { enableScripts: true };
        this._updateWebview();

        webviewView.onDidDispose(() => {
            this._webviewView = null;
            this._onDidDispose.fire();
        });
    }

    updateContent(content) {
        this._currentContent += content;
        this._updateWebview();
    }

    _updateWebview() {
        if (this._webviewView) {
            this._webviewView.webview.html = this._getWebviewContent(this._currentContent);
        }
    }

    _getWebviewContent(markdown) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DevMate</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/vs2015.min.css">
            <style>
                body { 
                    font-family: var(--vscode-editor-font-family);
                    font-size: var(--vscode-editor-font-size);
                    padding: 10px;
                    color: var(--vscode-editor-foreground);
                    background-color: var(--vscode-editor-background);
                }
                pre {
                    background-color: var(--vscode-editor-background);
                    padding: 10px;
                    border-radius: 5px;
                    overflow-x: auto;
                }
                code {
                    font-family: var(--vscode-editor-font-family);
                }
                #content {
                    padding-bottom: 50px; /* Add some padding at the bottom */
                }
            </style>
        </head>
        <body>
            <div id="content"></div>
            <script>
                const converter = new showdown.Converter({tables: true, tasklists: true, strikethrough: true});
                const markdown = ${JSON.stringify(markdown)};
                let html = converter.makeHtml(markdown);
                document.getElementById('content').innerHTML = html;
    
                // Apply syntax highlighting
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
    
                // Auto scroll to the bottom when new content is added
                window.scrollTo(0, document.body.scrollHeight);

                // Set up a MutationObserver to watch for changes in the content
                const observer = new MutationObserver((mutations) => {
                    window.scrollTo(0, document.body.scrollHeight);
                });

                observer.observe(document.getElementById('content'), {
                    childList: true,
                    subtree: true
                });
            </script>
        </body>
        </html>`;
    }
}

module.exports = ApiResponseWebviewProvider;