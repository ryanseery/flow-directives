import * as React from 'react';
import { Comp, KeyValue } from './createFlowComponent';

const checkBool = (a: any): boolean => typeof a === 'boolean';

export class Cache {
  public data: KeyValue[] = [];

  set(args: KeyValue): void {
    const newArray = [{ ...args }, ...this.data];
    this.data = [...Array.from(new Set(newArray))];
  }

  remove(id: string): void {
    const filteredData = this.data.filter(item => item.id !== id);
    this.data = [...filteredData];
  }

  getSibling(id: string) {
    const test = this.data.findIndex(item => item.id === id);

    console.log('test: ', test);
  }

  length(): number {
    return this.data.length;
  }

  clear(): void {
    this.data = [];
  }
}

const cache = new Cache();

interface IUseRender extends Comp {
  id: string;
}

export function useRender({
  id,
  'r-if': rIf,
  'r-else': rElse,
  'r-else-if': rElseIf,
  ...rest
}: IUseRender): [KeyValue, boolean] {
  const [isIf, isElse, isElseIf] = React.useMemo(() => [checkBool(rIf), checkBool(rElse), checkBool(rElseIf)], []);

  React.useEffect(() => {
    cache.set({ id, ...rest });

    return () => {
      cache.remove(id);
    };
  }, []);

  if (isIf) {
    return [cache, rIf as boolean];
  }

  if (isElse) {
    console.log('func: ', cache.data);
    return [cache, false];
  }

  if (isElseIf) {
    return [cache, false];
  }

  return [cache, true];
}
