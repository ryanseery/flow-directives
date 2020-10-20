import * as React from 'react';
import { Comp, KeyValue } from './createFlowComponent';

const checkBool = (a: any): boolean => typeof a === 'boolean';

class Cache {
  public data = new Set();

  public set(args: KeyValue): void {
    this.data.add(args);
  }

  public remove(args: KeyValue): void {
    this.data.delete(args);
  }

  public clear(): void {
    this.data.clear();
  }

  public length(): number {
    return this.data.size;
  }

  public getSibling() {}
}

const cache = new Cache();

interface IUseRender extends Comp {
  id: string;
}

export function useRender(props: IUseRender): [boolean] {
  const [isIf, isElse, isElseIf] = React.useMemo(
    () => [checkBool(props['r-if']), checkBool(props['r-else']), checkBool(props['r-else-if'])],
    []
  );

  React.useEffect(() => {
    cache.set(props);
    return () => {
      cache.remove(props);
    };
  }, []);

  if (isIf) {
    return [props['r-if'] as boolean];
  }

  if (isElse) {
    console.log('in if: ', cache.data);
    // const sibling: Comp = cache.get(cacheSize);
    // is sibling a flow comp
    // if ('r-if' in sibling) {
    //   return [!sibling['r-if'] as boolean];
    // }
    return [true];
  }

  if (isElseIf) {
    return [false];
  }

  return [true];
}
