import { ElementHandle, JSHandle } from 'puppeteer';
import fs from 'fs';

class ExtendedHandle {
  baseHandle: ElementHandle;
  constructor(handle: ElementHandle) {
    this.baseHandle = handle;
  }

  convertHandleToJSON = async (
    handle: ElementHandle,
  ): Promise<string | null> => {
    console.info('Converting handle to text content');

    const textContentHandle = await handle.getProperty('textContent');
    return await textContentHandle.jsonValue();
  };

  filterHandleContent = async (handle: JSHandle) => {
    console.info('Filtering handle content');
    return await handle.evaluate((element: any) => {
      const textContent = element.textContent;
      const jsonStartIndex = textContent.indexOf('{');
      const jsonEndIndex = textContent.lastIndexOf('}') + 1;
      return textContent.slice(jsonStartIndex, jsonEndIndex);
    });
  };

  findJSONAndWriteToFile = async (path: string): Promise<void> => {
    const jsonContent = await this.filterHandleContent(this.baseHandle);
    if (!jsonContent || jsonContent.length === 0) {
      console.error('Text content empty or null');
      return;
    }
    fs.writeFileSync(path, jsonContent);
  };
}

export default ExtendedHandle;
