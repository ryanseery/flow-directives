import * as React from 'react';
import { Comp } from './createFlowComponent';

const checkBool = (a: any): boolean => typeof a === 'boolean';

let cache: Comp[] = [];

export function useRefListener(props: Comp): [boolean] {
  cache.push(props);

  const [isIf, isElse, isElseIf] = React.useMemo(
    () => [checkBool(props['r-if']), checkBool(props['r-else']), checkBool(props['r-else-if'])],
    []
  );

  React.useEffect(() => {
    return () => {
      console.log('******************* UNMOUNTED');
      cache = [];
    };
  }, []);

  if (isIf) {
    return [props['r-if'] as boolean];
  }

  if (isElse) {
    if (cache.length !== 0) {
      const sibling: Comp = cache[cache.length - 2];
      // is sibling a flow comp
      if ('r-if' in sibling) {
        return [!sibling['r-if'] as boolean];
      }
      return [true];
    }
  }

  if (isElseIf) {
    return [false];
  }

  console.log('cache: ', cache);

  return [true];
}
