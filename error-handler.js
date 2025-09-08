// Global error handling and display
class ErrorDisplay {
    constructor() {
        this.errorContainer = null;
        this.errorCount = 0;
        this.init();
    }

    init() {
        // Create error display container
        this.errorContainer = document.createElement("div");
        this.errorContainer.id = "error-display";
        this.errorContainer.style.cssText = `
            position: absolute;
            top: 300px;
            left: 10px;
            width: 400px;
            max-height: 200px;
            background: rgba(231, 76, 60, 0.9);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            overflow-y: auto;
            z-index: 200;
            display: none;
            border: 2px solid #c0392b;
        `;
        document.body.appendChild(this.errorContainer);

        // Global error handler
        window.addEventListener("error", (event) => {
            this.logError("SCRIPT ERROR", event.error || event.message, event.filename, event.lineno);
        });

        // Unhandled promise rejection handler
        window.addEventListener("unhandledrejection", (event) => {
            this.logError("PROMISE REJECTION", event.reason, "Promise", 0);
        });

        // Console error override
        const originalConsoleError = console.error;
        console.error = (...args) => {
            this.logError("CONSOLE ERROR", args.join(" "), "Console", 0);
            originalConsoleError.apply(console, args);
        };
    }

    logError(type, message, file, line) {
        this.errorCount++;
        const timestamp = new Date().toLocaleTimeString();
        
        const errorHtml = `
            <div style="margin-bottom: 10px; padding: 5px; background: rgba(0,0,0,0.3); border-radius: 3px;">
                <strong>[${this.errorCount}] ${type}</strong><br>
                <span style="color: #ffcccc;">${message}</span><br>
                <small>${file}:${line} at ${timestamp}</small>
            </div>
        `;
        
        this.errorContainer.innerHTML += errorHtml;
        this.errorContainer.style.display = "block";
        
        // Auto-scroll to bottom
        this.errorContainer.scrollTop = this.errorContainer.scrollHeight;
        
        // Update header if it exists
        const loading = document.getElementById("loading");
        if (loading && !loading.innerHTML.includes("ERROR")) {
            loading.innerHTML = `<span class="error">⚠️ ${this.errorCount} ERROR(S) DETECTED</span><br>` + loading.innerHTML;
        }
    }

    clear() {
        this.errorContainer.innerHTML = "";
        this.errorContainer.style.display = "none";
        this.errorCount = 0;
    }
}

// Initialize error display
window.errorDisplay = new ErrorDisplay();

// Add clear button
window.addEventListener("keydown", (event) => {
    if (event.key === "c" && event.ctrlKey) {
        window.errorDisplay.clear();
        console.log("Error display cleared");
    }
});
