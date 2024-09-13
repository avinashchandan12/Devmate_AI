# DevMate AI - Code Complexity & Optimization for JavaScript, TypeScript, and JSX with AI

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-repo-link)
[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code%20Marketplace-Install%20Now-green)](https://marketplace.visualstudio.com/items?itemName=devmate_ai)

## Overview

**DevMate AI** is a powerful Visual Studio Code extension designed to help developers enhance their code by analyzing time and space complexity for each function and offering AI-driven optimization suggestions. This tool currently supports JavaScript (`.js`), TypeScript (`.ts`), and JSX (`.jsx`) file formats.

Whether you're concerned about code performance or want to improve algorithmic efficiency, DevMate AI helps identify areas for improvement in real time—directly within your coding environment.

## Features

- **Time & Space Complexity Analysis**: Instantly displays time and space complexity for each function.
- **AI-Driven Code Optimization**: Get smart, AI-powered suggestions for optimizing your code.
- **File Type Support**: Works with JavaScript, TypeScript, and JSX files.
- **Seamless Integration**: Results and optimizations are displayed directly within the VS Code editor for a smooth workflow.

## How It Works

### 1. **Install the Extension**
   - Open Visual Studio Code.
   - Navigate to the Extensions Marketplace and search for `DevMate AI`.
   - Click **Install** to add it to your workspace.

### 2. **Usage**
   - Open a supported file (`.js`, `.ts`, or `.jsx`).
   - For each function, you'll see two options:
     - **Analyze Complexity**: Get a quick analysis of time and space complexity.
     - **Optimize with AI**: Receive actionable, AI-driven optimization suggestions to improve function performance.

### 3. **Analyze Complexity**
   - Click **Analyze Complexity** to calculate and display the time and space complexity of the function.
   - Results will be shown in the "API Response" section on the left side of the editor.

### 4. **Optimize with AI**
   - Click **Optimize with AI** to get AI-generated suggestions for improving the function's performance.
   - The optimized code will be displayed in the same "API Response" section.

## Local Machine Setup with Ollama
**You can also run this extension on your local machine using Ollama.**

Here’s how:

1. **Download Ollama** from [Ollama’s official website](https://ollama.com) and choose your favorite model to run.
2. **Clone the Repository**: Clone this repository and download the server file from the `server` folder.
3. **Install Node.js**: Make sure Node.js is installed on your machine.
4. **Run Locally**: Start the server locally to process the code analysis using your model.

## Installation

### From Visual Studio Code Marketplace

1. Open Visual Studio Code.
2. Navigate to the Extensions view by clicking the **Extensions icon** in the Activity Bar.
3. Search for **DevMate AI**.
4. Click **Install**.

### Manual Installation

1. Download the latest release from the [GitHub Releases](https://github.com/avinash-sankeysolutions/Devmate_AI/releases) page.
2. Open Visual Studio Code, go to **Extensions** > **Install from VSIX...**, and select the downloaded `.vsix` file.

## Extension Settings

DevMate AI requires no configuration out of the box. However, you can access its settings to fine-tune behavior by going to:

- **File** > **Preferences** > **Settings** > **Extensions** > _DevMate AI_

## Roadmap

- **Support for More Languages**: Adding support for languages such as Python and Java.
- **Enhanced Complexity Analysis**: Advanced insights into best, average, and worst-case complexity.
- **Performance Tracking**: A performance dashboard to monitor code optimization over time.
- **Customizable Models**: Allow users to choose different AI models for code analysis and optimization.

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

## Feedback & Support

If you encounter any issues or have questions, feel free to open an issue in our [GitHub repository](https://github.com/avinash-sankeysolutions/Devmate_AI/issues).

For general inquiries or suggestions, please contact us through the repository's issue section.

---

Thank you for using **DevMate AI**! We’re excited to help you optimize your code and improve performance.
