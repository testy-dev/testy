import { Page } from "puppeteer";

export async function newPageWithNewContext(browser): Promise<Page> {
  const { browserContextId } = await browser._connection.send(
    "Target.createBrowserContext"
  );
  const { targetId } = await browser._connection.send("Target.createTarget", {
    url: "about:blank",
    browserContextId,
  });
  const targetInfo = { targetId: targetId };
  const client = await browser._connection.createSession(targetInfo);
  const page = await browser.newPage(
    { context: "another-context" },
    client,
    browser._ignoreHTTPSErrors,
    browser._screenshotTaskQueue
  );
  page.browserContextId = browserContextId;
  return page;
}

export const now = () => new Date().valueOf();
