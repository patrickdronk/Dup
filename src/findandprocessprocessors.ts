import { readFileSync } from 'fs';
import { join } from 'path';
import * as glob from 'glob';

export const processFile = (filePath: string) => {
  //read the contents of the file
  const fileContent = readFileSync(filePath, 'utf-8');

  const regex = /event:?\s+(\w+)/gm;
  const matches = fileContent.matchAll(regex);
  for (const match of matches) {
    console.log(match[1]);
  }

  const regexHandler = /(d{1,3}.){3}d{1,3}/gm
  const handlerMatches = fileContent.matchAll(regexHandler);
  for (const match of handlerMatches) {
    console.log(match[1]);
  }
};

export const handleProcessorFiles = () => {
  const cwd = join(__dirname, 'app');
  const entrypoints = glob
      .sync('**/*processor.ts', { cwd })
      .map((p) => join(cwd, p));

  for (let entrypoint of entrypoints) {
    processFile(entrypoint);
  }
}


