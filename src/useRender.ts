import * as React from 'react';
import { KeyValue } from './createFlowComponent';

type Dep = string | number | Function;

// const checkBool = (a: any): boolean => typeof a === 'boolean';

const cache: KeyValue = {};

// TODO cut out redundancy
// TODO determine render
export function useRender(key: string, obj: KeyValue, deps: Dep[]): KeyValue {
  // const [isIf, isElse, isElseIf] = React.useMemo(
  //   () => [checkBool(obj['r-if']), checkBool(obj['r-else']), checkBool(obj['r-else-if'])],
  //   []
  // );

  if (!cache[key]) {
    cache[key] = {
      subs: 0,
      deps,
      value: obj,
    };
  } else {
    const oldDeps = (cache[key] = cache[key].deps);

    if (oldDeps.length !== deps || oldDeps.some((d: Dep, i: number) => deps[i] !== d)) {
      cache[key] = {
        deps,
        value: obj,
      };
    }
  }

  React.useEffect(() => {
    cache[key].subs += 1;

    return () => {
      cache[key] -= 1;

      if (!cache[key].subs) {
        delete cache[key];
      }
    };
  }, []);

  return cache;
}
