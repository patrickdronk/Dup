import { readFileSync } from 'fs';
import { join } from 'path';
import * as glob from 'glob';

const processFile = (filePath: string) => {
  //read the contents of the file
  const fileContent = readFileSync(filePath, 'utf-8');

  const regex = /event:?\s+(\w+)/gm;
  const matches = fileContent.matchAll(regex);
  for (const match of matches) {
    console.log(match[1]);
  }
};

const cwd = join(__dirname, 'app');
const entrypoints = glob
  .sync('**/*processor.ts', { cwd })
  .map((p) => join(cwd, p));

for (let entrypoint of entrypoints) {
  processFile(entrypoint);
}

