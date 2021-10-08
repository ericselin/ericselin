import { awaitGenerator, awaitInChunks, generatorMap, fromArray } from "./lazy.ts";

const addOne = (num: number) => {
  console.log("    Adding", num, "by one");
  return num + 1;
};

const subtract = (by: number) =>
  (num: number) => {
    console.log("    Subtracting", num, "by", by);
    return num - by;
  };

const sleep = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });
  
  const write = async (num: number) => {
    await sleep(num * 100)
    console.log("  Slept for", num, "ticks");
    return `Wrote ${num}`;
};

const result = await Promise.resolve([2, 1, 2, 1])
  .then(fromArray)
  .then(generatorMap(addOne))
  .then(generatorMap(subtract(2)))
  .then(awaitInChunks(write, 3));

console.log(result);

export {};
