type OneArgFunction = (arg: any) => any;

/**
 * Lazy list evaluation helpers
 */
export const lazy = () => {
  const mappers: OneArgFunction[] = [];
  const self = {
    /**
     * Map values with the given function
     */
    map: (fn: OneArgFunction) => {
      mappers.push(fn);
      return self;
    },
    /**
     * Execute the given function for each generator value
     */
    each: (fn: OneArgFunction) => {
      return self;
    },
    /**
     * Run pipeline with the values from the generator sequentially
     */
    run: async (asyncGenerator: AsyncGenerator) => {
      const values = [];
      for await (const value of asyncGenerator) {
        let current = value;
        for (const fn of mappers) {
          current = await fn(current);
        }
        values.push(current);
      }
      return values;
    },
    /**
     * Run pipeline with the values from the generator in parallel
     */
    runAll: async (asyncGenerator: AsyncGenerator) => {
      const promises = [];
      for await (const value of asyncGenerator) {
        let current = Promise.resolve(value);
        for (const fn of mappers) {
          current = current.then(fn);
        }
        promises.push(current);
      }
      return Promise.all(promises);
    },
  };
  return self;
};
