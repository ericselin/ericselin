export function* fromArray<T>(array: T[]) {
  yield* array;
}

export const generatorMap = <F extends (arg: any) => any>(fn: F) =>
  function* generatorMapper(generator: Generator<Parameters<F>[0]>): Generator<ReturnType<F>> {
    for (const element of generator) {
      yield fn(element);
    }
  };

export const awaitGenerator = (generator: Generator) => {
  return Promise.all(generator);
};

export const take = (count: number) =>
  function* take<T extends any>(generator: Generator<T>): Generator<T> {
    for (let i = 0; i < count; i++) {
      const { value, done } = generator.next();
      yield value as T;
      if (done) return;
    }
  };

export const awaitInChunks = (
  asyncGenerator: (arg: any) => Promise<unknown>,
  size: number,
) =>
  async (generator: Generator) => {
    const results = [];
    let run = true;
    do {
      const chunkedResultsArray = await Promise.resolve(generator)
        .then(take(size))
        .then(generatorMap(asyncGenerator))
        .then(awaitGenerator);
      results.push(...chunkedResultsArray);
      run = chunkedResultsArray.length >= size;
    } while (run);
    return results;
  };
