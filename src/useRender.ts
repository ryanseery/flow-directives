import * as React from 'react';
import { Comp, KeyValue } from './createFlowComponent';

const checkBool = (a: any): boolean => typeof a === 'boolean';

type ICache = {
  data: KeyValue[];
  counter: number;
  getId: (tag: string) => string;
  set: (args: Comp) => void;
  clear: () => void;
  length: () => number;
  isUnique: (id: string) => boolean;
};

const cache: ICache = {
  data: [],
  counter: 0,
  getId: tag => {
    return `${tag}_${++cache.counter}`;
  },
  set: args => {
    if (cache.isUnique(args.tag)) {
      cache.data.push(args);
    }
  },
  clear: () => {
    cache.data = [];
  },
  length: () => {
    return Object.keys(cache.data).length;
  },
  isUnique: id => {
    let found: boolean = true;

    for (let i = 0; i < cache.data.length; i++) {
      if (cache.data[i]['data-flow-id'] === id) {
        found = false;
        break;
      }
    }

    return found;
  },
};

export function useRender(props: Comp): [boolean, ICache['getId']] {
  cache.set(props);

  const [isIf, isElse, isElseIf] = React.useMemo(
    () => [checkBool(props['r-if']), checkBool(props['r-else']), checkBool(props['r-else-if'])],
    []
  );

  React.useEffect(() => {
    return () => {
      console.log('******************* UNMOUNTED');
      cache.clear();
    };
  }, []);

  if (isIf) {
    return [props['r-if'] as boolean, cache.getId];
  }

  if (isElse) {
    if (cache) {
      console.log('cache: ', cache);
      // const sibling: Comp = cache.get(cacheSize);
      // is sibling a flow comp
      // if ('r-if' in sibling) {
      //   return [!sibling['r-if'] as boolean];
      // }
      return [true, cache.getId];
    }
  }

  if (isElseIf) {
    return [false, cache.getId];
  }

  console.log('cache: ', cache.data);

  return [true, cache.getId];
}
