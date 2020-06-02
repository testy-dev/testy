import { Page } from "puppeteer";

export async function visit(page: Page, parameter: string) {
  console.log("visit", parameter);
  await page.goto(parameter);
  return { state: "success" };
}

export async function click(
  page: Page,
  parameter: string,
  selector: string,
  parent: string
) {
  console.log("click", selector);
  await page.waitForSelector(parent);

  async function hoverParent(): Promise<void> {
    console.log("parent:", parent);
    const { x, y, height, width } = await page.evaluate(parent => {
      document.querySelector(parent).scrollIntoView();
      const data = document.querySelector(parent).getBoundingClientRect();
      return { x: data.x, y: data.y, height: data.height, width: data.width };
    }, parent);
    await page.mouse.move(x + width / 2, y + height / 2);
  }

  const item = await page.$(selector);
  if (item === null) {
    await hoverParent();
  } else {
    try {
      await page.click(selector);
    } catch (e) {
      await hoverParent();
      await page.click(selector);
    }
  }

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
  console.log("Typing", selector);
  const typeArr = parameter.split("{enter}");
  for (const typedStr of typeArr) {
    await page.type(selector, typedStr);
    await page.keyboard.press("Enter");
  }
  console.log("return type");
  return { state: "success" };
}
