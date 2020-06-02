import { Page } from "puppeteer";

export async function visit(page: Page, parameter: string) {
  console.log("visit", parameter);
  await page.goto(parameter);
  return { state: "success" };
}

export async function click(page: Page, parameter: string, selector: string) {
  console.log("click", selector);
  const item = await page.$(selector);
  if (item === null) throw "Element not found";
  await page.click(selector);
  return { state: "success" };
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
  return { state: "success" };
}

export async function type(page: Page, parameter: string, selector: string) {
  await page.type(selector, parameter);
  return { state: "success" };
}
