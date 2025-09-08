const puppeteer = require("puppeteer");
const fs = require("fs");

async function testVisualization() {
    console.log("🚀 Starting Puppeteer test...");
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    
    const page = await browser.newPage();
    
    // Listen for console logs from the page
    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
    page.on("error", err => console.log("PAGE ERROR:", err));
    
    try {
        console.log("📊 Loading visualization...");
        await page.goto("http://localhost:9000/index.html", { waitUntil: "networkidle0" });
        
        // Wait for Three.js to load
        await page.waitForSelector("canvas", { timeout: 10000 });
        console.log("✅ Canvas element found");
        
        // Test that spheres are created
        const sphereCount = await page.evaluate(() => {
            return window.visualizer ? window.visualizer.spheres.length : 0;
        });
        
        console.log(`🌍 Spheres created: ${sphereCount}`);
        
        // Take screenshot
        await page.screenshot({ path: "test-screenshot.png", fullPage: true });
        console.log("📸 Screenshot saved: test-screenshot.png");
        
        // Test animation frame
        await page.waitForTimeout(2000);
        console.log("⏰ Animation running for 2 seconds");
        
        const testReport = {
            timestamp: new Date().toISOString(),
            sphereCount: sphereCount,
            status: sphereCount > 0 ? "PASS" : "FAIL",
            nextStep: "Add Schema.org data layer"
        };
        
        fs.writeFileSync("test-report.json", JSON.stringify(testReport, null, 2));
        console.log("📋 Test report saved: test-report.json");
        
        console.log("🎉 Nested sphere visualization test COMPLETE!");
        
    } catch (error) {
        console.error("❌ Test failed:", error);
    } finally {
        await browser.close();
    }
}

testVisualization().catch(console.error);
