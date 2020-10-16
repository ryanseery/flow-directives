import * as React from 'react';

const checkBool = (a: any) => typeof a === "boolean";

type UseRefListener = {
  rIf?: boolean;
  rElseIf?: boolean;
  rElse?: boolean;
}

export function useRefListener({ rIf, rElseIf, rElse }: UseRefListener): [boolean, React.Ref<HTMLElement>] {
  const ref = React.useRef<HTMLElement | null>(null);
  const [isIf, isElse, isElseIf] = React.useMemo(() => ([checkBool(rIf), checkBool(rElse), checkBool(rElseIf)]), []);
  /**
   * if rIf its reliant on state
   * 
   * if rElseIf its reliant on state
   * 
   * if is rElse, opposite of the node's above's else if
   */
  if (isIf) {
    return [(rIf as boolean), ref]
  }

  // this needs to be dependant on the rIF state -> opposite of
  if (isElse) {
    return [false, ref];
  }

  if (isElseIf) {
    return [(rElse as boolean), ref]
  }

  return [true, ref]
}