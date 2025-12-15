import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  "/",
  "/aboutus",
  "/contact",
  "/home-nursing-services",
  "/post-operative-care",
  "/ventilator-care",
  "/palliative-care",
  "/elderly-care",
  "/pediatric-palliative",
  "/paralytic-care",
  "/parkinson-care",
  "/physiotherapy-services",
  "/doctor-home-visits",
  "/medical-tourism",
  "/injection-services",
  "/blood-test",
  "/hydrafacial-services",
  "/post-stroke-recovery",
  "/refund-policy",
  "/bookbloodtest",
];

const BASE_URL = "http://localhost:4173";

(async () => {
  console.log("Starting pre-rendering...");

  const browser = await puppeteer.launch({ headless: "new" });
  const distPath = path.join(__dirname, "dist");

  for (const route of routes) {
    console.log(`Pre-rendering: ${route}`);

    const page = await browser.newPage();

    try {
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      const html = await page.content();

      // Determine file path
      let filePath;
      if (route === "/") {
        filePath = path.join(distPath, "index.html");
      } else {
        filePath = path.join(distPath, route, "index.html");
      }

      // Create directory if needed
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // Write pre-rendered HTML
      fs.writeFileSync(filePath, html);
      console.log(`✓ Created: ${filePath}`);
    } catch (error) {
      console.error(`✗ Failed to pre-render ${route}:`, error.message);
    }

    await page.close();
  }

  await browser.close();
  console.log("Pre-rendering complete!");
  process.exit(0);
})();
