import * as React from 'react';
import { Comp, KeyValue } from './createFlowComponent';

const checkBool = (a: any): boolean => typeof a === 'boolean';

export class Cache {
  public data: KeyValue[] = [];

  set(args: KeyValue): void {
    const newArray = [{ ...args }, ...this.data];
    this.data = [...Array.from(new Set(newArray))];
  }

  remove(args: KeyValue): void {
    const filteredData = this.data.filter(item => item.id !== args.id);
    this.data = [...filteredData];
  }
}

const cache = new Cache();

interface IUseRender extends Comp {
  id: string;
}

export function useRender({ id, 'r-if': rIf, 'r-else': rElse, 'r-else-if': rElseIf, ...rest }: IUseRender): [boolean] {
  const [isIf, isElse, isElseIf] = React.useMemo(() => [checkBool(rIf), checkBool(rElse), checkBool(rElseIf)], []);

  React.useEffect(() => {
    cache.set({ id, ...rest });

    return () => {
      cache.remove({ id, ...rest });
    };
  }, []);

  console.log('cache: ', cache.data);

  if (isIf) {
    return [rIf as boolean];
  }

  if (isElse) {
    return [false];
  }

  if (isElseIf) {
    return [false];
  }

  return [true];
}
