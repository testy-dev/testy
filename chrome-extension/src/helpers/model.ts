import { Block, Command, RecState } from "../types";
import { v4 as generate } from "uuid";

export default class Model {
  status: RecState;

  processedCode: Block[];

  constructor() {
    this.sync();
  }

  /**
   * Checks the data currently stored in Chrome local storage and performs logic based on current
   * recording status.
   */
  sync(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["status", "codeBlocks"], result => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else {
          if (result.status === "on" || result.status === "paused") {
            this.status = "paused";
            this.processedCode = result.codeBlocks || [];
          } else {
            this.status = "off";
            this.processedCode = [];
          }
          chrome.storage.local.set(
            { status: this.status, codeBlocks: this.processedCode },
            () => {
              if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
              else resolve();
            }
          );
        }
      });
    });
  }

  /**
   * Resets application to original state.
   */
  reset(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.status = "off";
      this.processedCode = [];
      chrome.storage.local.set(
        { status: this.status, codeBlocks: this.processedCode },
        () => {
          if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
          else resolve();
        }
      );
    });
  }

  /**
   * Adds a codeblock to the array of code blocks and updates Chrome local storage.
   * @param block
   */
  pushBlock(block: Command): Promise<Block> {
    const last = this.processedCode[this.processedCode.length - 1];

    // If last and actual block is type to same element => add type value to previous block
    if (
      last &&
      last.value.command === "type" &&
      block.command === "type" &&
      last.value.selector === block.selector
    ) {
      last.value.parameter += block.parameter;

      return new Promise((resolve, reject) => {
        chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
          if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
          else resolve(last);
        });
      });
    }

    // If last block is click and actual is type to same element => remove click and add type
    if (
      last &&
      last.value.command === "click" &&
      block.command === "type" &&
      last.value.selector === block.selector
    ) {
      // Remove last block
      this.processedCode.splice(-1, 1);
    }

    // Else add block
    const newBlock: Block = {
      value: block,
      id: generate(),
    };
    this.processedCode.push(newBlock);

    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve(newBlock);
      });
    });
  }

  /**
   * Deletes a code block from the code display and updates Chrome local storage.
   * @param index
   */
  deleteBlock(index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processedCode.splice(index, 1);
      chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }

  /**
   * Allows the user to drag and drop code blocks to new positions in the array.
   * @param i
   * @param j
   */
  moveBlock(i: number, j: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const dragged = this.processedCode.splice(i, 1)[0];
      this.processedCode.splice(j, 0, dragged);
      chrome.storage.local.set({ codeBlocks: this.processedCode }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }

  /**
   * Updates the recording status and sends to the background.
   * @param newStatus
   */
  updateStatus(newStatus: RecState): Promise<void> {
    return new Promise((resolve, reject) => {
      this.status = newStatus;
      chrome.storage.local.set({ status: this.status }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        else resolve();
      });
    });
  }
}
