import fs from 'fs';
class ExtendedHandle {
    constructor(handle) {
        this.convertHandleToJSON = async (handle) => {
            console.info('Converting handle to text content');
            const textContentHandle = await handle.getProperty('textContent');
            return await textContentHandle.jsonValue();
        };
        this.filterHandleContent = async (handle) => {
            console.info('Filtering handle content');
            return await handle.evaluate((element) => {
                const textContent = element.textContent;
                const jsonStartIndex = textContent.indexOf('{');
                const jsonEndIndex = textContent.lastIndexOf('}') + 1;
                return textContent.slice(jsonStartIndex, jsonEndIndex);
            });
        };
        this.findJSONAndWriteToFile = async (path) => {
            const jsonContent = await this.filterHandleContent(this.baseHandle);
            if (!jsonContent || jsonContent.length === 0) {
                console.error('Text content empty or null');
                return;
            }
            fs.writeFileSync(path, jsonContent);
        };
        this.baseHandle = handle;
    }
}
export default ExtendedHandle;
