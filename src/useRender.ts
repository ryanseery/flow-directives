import * as React from 'react';
import { KeyValue } from './createFlowComponent';

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

    this.data.forEach((item, idx) => {
      if (item.id === args.id) {
        this.data[idx] = args;
      }
    });
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
    // TODO need to move up sibling tree to find rIf and get state
    // TODO what about nested if else
    // move up the tree, if there are else ifs put value in array. the whole array needs to be false
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

type UseRender = {
  id: string;
  rIf?: boolean;
  rElse?: boolean;
  rElseIf?: boolean;
};
export function useRender({ id, rIf, rElse, rElseIf }: UseRender): [boolean] {
  // add component to cache
  cache.add({ id, rIf, rElse, rElseIf });
  // create flags
  const [isIf, isElse, isElseIf] = React.useMemo(() => [checkBool(rIf), checkBool(rElse), checkBool(rElseIf)], []);

  React.useEffect(() => {
    return () => {
      cache.remove(id);
    };
  }, []);

  if (isIf) {
    return [rIf as boolean];
  }

  if (isElseIf) {
    return [rElseIf as boolean];
  }

  if (isElse) {
    const render = cache.getRender(id);
    return [render];
  }

  return [true];
}
