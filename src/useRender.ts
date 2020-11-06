import * as React from 'react';
import { Comp, KeyValue } from './createFlowComponent';

const checkBool = (a: any): boolean => typeof a === 'boolean';

export class Cache {
  public data: KeyValue[];

  constructor() {
    this.data = [];
  }

  add(args: KeyValue): void {
    // check if object exists in array
    const isFound = this.data.some(item => item.id === args.id);

    if (!isFound) {
      this.data.push(args);
    }

    this.data.forEach(item => {
      if (item.id === args.id) {
        item = args;
      }
    });

    console.log('hello: ', this.data);
  }

  remove(id: string): void {
    const filteredData = this.data.filter(item => item.id !== id);
    this.data = [...filteredData];
  }

  getRender(id: string): boolean {
    // get index of sibling
    const idx = this.data.findIndex(item => item.id === id);
    // this is sibling
    const sibling = this.data[idx - 1];
    // check for r-else-if first
    if (sibling.rElseIf !== undefined) {
      return !sibling.rElseIf;
    }

    if (sibling.rIf !== undefined) {
      return !sibling.rIf;
    }

    return true;
  }

  length(): number {
    return this.data.length;
  }

  clear(): void {
    this.data = [];
  }
}

const cache = new Cache();

export function useRender({ id, 'r-if': rIf, 'r-else': rElse, 'r-else-if': rElseIf, ...rest }: Comp): [boolean] {
  cache.add({ id, rIf, rElse, rElseIf, ...rest });
  const [isIf, isElse, isElseIf] = React.useMemo(() => [checkBool(rIf), checkBool(rElse), checkBool(rElseIf)], []);

  React.useEffect(() => {
    return () => {
      cache.remove(id);
    };
  }, []);

  if (isIf) {
    return [rIf as boolean];
  }

  if (isElse) {
    const render = cache.getRender(id);
    console.log(render);
    return [render];
  }

  if (isElseIf) {
    const render = cache.getRender(id);
    return [render];
  }

  return [true];
}
