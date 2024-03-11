import { $ } from 'bun';
import { log } from '../src/utils/logger';

const sleep = (ms: number) => {
   return new Promise((resolve) => setTimeout(resolve, ms));
};
let run = true;

while (run) {
   await sleep(1000);
   const path = 'package.json';
   const file = Bun.file(path);
   const contents = await file.json();
   const version = contents.version as string;
   await $`echo ${version}`;
}
