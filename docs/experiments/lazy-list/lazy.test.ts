import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.81.0/testing/asserts.ts";
import { fromArray, take } from "./lazy.ts";

Deno.test("from array", () => {
  const numbers = fromArray([1, 2, 3]);
  assertEquals(numbers.next().value, 1);
  assertEquals(numbers.next().value, 2);
  assertEquals(numbers.next().value, 3);
  assert(numbers.next().done);
});

Deno.test("take", () => {
  const numbers = fromArray([1, 2, 3]);
  const taken = take(2)(numbers);
  assertEquals(taken.next().value, 1);
  assertEquals(taken.next().value, 2);
  assert(taken.next().done);
});
