import { Page } from "puppeteer";

import { BlockResult } from "@testy/shared";

export async function visit(page: Page, parameter: string) {
  console.log("visit", parameter);
  await page.goto(parameter);
  return { state: "success" as BlockResult };
}

export async function click(
  page: Page,
  parameter: string,
  selector: string,
  parents: string[]
) {
  console.log("click", selector);
  await page.waitForSelector(parents[parents.length - 1]);

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

  await hoverParent();
  await page.$(selector);
  await page.click(selector);

  return { state: "success" as BlockResult };
}

export async function checkContainsText(
  page: Page,
  parameter: string,
  selector: string
) {
  console.log("check test");
  await page.waitForSelector(selector);
  const selectorHasText = await page.evaluate(
    ({ selector, parameter }) =>
      [...document.querySelectorAll(selector)].some(el =>
        el.textContent.includes(parameter)
      ),
    { selector, parameter }
  );
  if (!selectorHasText) throw "Selector not found";
  return { state: "success" as BlockResult };
}

export async function type(page: Page, parameter: string, selector: string) {
  console.log("Typing", selector);
  const typeArr = parameter.split("{enter}");
  for (const typedStr of typeArr) {
    await page.type(selector, typedStr);
    await page.keyboard.press("Enter");
  }
  console.log("return type");
  return { state: "success" as BlockResult };
}
