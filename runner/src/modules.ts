import { Page } from "puppeteer";

export async function visit(page: Page, parameter: string) {
  console.log("Visit - parameter", parameter);
  await page.goto(parameter);
}

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
    console.log("Click - selector", selector);
    await page.waitForSelector(selector, { timeout: 10000, visible: true });
    console.log("Click - selector found");
  } catch (e) {
    console.log("Click - hovering parent");
    await hoverParent();
    await page.waitForSelector(selector, { timeout: 10000, visible: true });
    console.log("Click - selector found");
  } finally {
    await page.click(selector);
    console.log("Click - clicked");
  }
}

export async function checkContainsText(
  page: Page,
  parameter: string,
  selector: string
) {
  console.log(`Check - selector ${selector} should be ${parameter}`);
  await page.waitForSelector(selector);
  console.log("Check - selector found");

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
  console.log("Check - selector text is", selectorText);
  if (!selectorText.includes(parameter)) throw new Error("Selector not found");
}

export async function type(page: Page, parameter: string, selector: string) {
  await page.waitForSelector(selector);
  console.log(`Type - writing ${parameter} to selector ${selector}`);
  const typeArr = parameter.split("{enter}");
  for (const typedStr of typeArr) {
    await page.type(selector, typedStr);
    await page.keyboard.press("Enter");
  }
  console.log("Type - done");
}
