import * as React from 'react';
import { Comp, KeyValue } from './createFlowComponent';

const checkBool = (a: any): boolean => typeof a === 'boolean';

const cache: KeyValue[] = [];

interface IUseRender extends Comp {
  id: string;
}
export function useRender(props: IUseRender): [boolean] {
  const [isIf, isElse, isElseIf] = React.useMemo(
    () => [checkBool(props['r-if']), checkBool(props['r-else']), checkBool(props['r-else-if'])],
    []
  );

  React.useEffect(() => {
    cache.push(props);
    return () => {
      cache.filter(item => item.id !== props.id);
    };
  }, []);

  if (isIf) {
    return [props['r-if'] as boolean];
  }

  if (isElse) {
    console.log('cache: ', cache);

    return [true];
  }

  if (isElseIf) {
    return [false];
  }

  return [true];
}
