import { Page } from "puppeteer";
import debug from "debug";

const debugCommand = debug("runner:command");

const debugVisit = debugCommand.extend("visit");
export async function visit(page: Page, parameter: string) {
  debugVisit("Visit %s", parameter);
  await page.goto(parameter);
}

const debugClick = debugCommand.extend("click");
export async function click(
  page: Page,
  parameter: string,
  selector: string,
  parents: string[]
) {
  // To avoid situations when clicked element is not visible without hover
  async function hoverParent(): Promise<void> {
    const { x, y, height, width } = await page.evaluate(parents => {
      for (const parent of parents) {
        const parentElement = document.querySelector(parent);

        if (parentElement) {
          const data = parentElement.getBoundingClientRect();
          if (!data.height || !data.width) continue;

          parentElement.scrollIntoView();

          return {
            x: data.x,
            y: data.y,
            height: data.height,
            width: data.width,
          };
        }
      }
    }, parents);
    await page.mouse.move(x + width / 2, y + height / 2);
  }

  try {
    debugClick("Click to %s", selector);
    await page.waitForSelector(selector, { timeout: 10000, visible: true });
    debugClick("selector found");
  } catch (e) {
    debugClick("hovering parent");
    await hoverParent();
    await page.waitForSelector(selector, { timeout: 10000, visible: true });
    debugClick("selector found");
  } finally {
    await page.click(selector);
    debugClick("clicked");
  }
}

const debugCheck = debugCommand.extend("check");
export async function checkContainsText(
  page: Page,
  parameter: string,
  selector: string
) {
  debugCheck(`selector ${selector} should be ${parameter}`);
  await page.waitForSelector(selector);
  debugCheck("selector found");

  let selectorText = undefined;
  let iterator = 0;

  while (!selectorText && iterator < 10) {
    selectorText = await page.evaluate(
      ({ selector }) => document.querySelector(selector).textContent,
      { selector }
    );
    await page.waitFor(500);
    iterator++;
  }
  debugCheck("selector text is", selectorText);
  if (!selectorText.includes(parameter)) throw new Error("Selector not found");
}

const debugType = debugCommand.extend("type");
export async function type(page: Page, parameter: string, selector: string) {
  await page.waitForSelector(selector);
  debugType(`writing ${parameter} to selector ${selector}`);

  const typeArr = (parameter ?? "").split(/({\w+})/g).filter(i => i.length > 0);
  for (const typedStr of typeArr) {
    if (typedStr === "{enter}") await page.keyboard.press("Enter");
    else await page.type(selector, typedStr);
  }
  debugType("done");
}
