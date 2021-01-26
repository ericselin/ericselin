import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { lazy } from "./stream.ts";

async function* fromArray<T>(array: T[]) {
  yield* array;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const multiplyByTwo = (log: string[]) =>
  async (num: number) => {
    log.push(`multiplying ${num} by two`);
    return num * 2;
  };

Deno.test("mapper works", async () => {
  const log: string[] = [];
  const result = await lazy()
    .map(async (num: number) => {
      log.push(`adding one to ${num}`);
      return num + 1;
    })
    .map(multiplyByTwo(log))
    .run(fromArray([1, 2]));

  assertEquals(log, [
    "adding one to 1",
    "multiplying 2 by two",
    "adding one to 2",
    "multiplying 3 by two",
  ]);
  assertEquals(result, [4, 6]);
});

Deno.test("runAll works", async () => {
  const log: string[] = [];
  const result = await lazy()
    .map(async (num: number) => {
      await sleep(num * 100);
      log.push(`adding one to ${num}`);
      return num + 1;
    })
    .map(multiplyByTwo(log))
    .runAll(fromArray([2, 1]));

  assertEquals(log, [
    "adding one to 1",
    "multiplying 2 by two",
    "adding one to 2",
    "multiplying 3 by two",
  ]);
  assertEquals(result, [6, 4]);
});
