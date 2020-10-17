import * as React from 'react';

const checkBool = (a: any): boolean => typeof a === "boolean";

type UseRefListener = {
  rIf?: boolean;
  rElseIf?: boolean;
  rElse?: boolean;
}

export function useRefListener({ rIf, rElseIf, rElse }: UseRefListener): [boolean, any] {
  // const ref = React.useRef<HTMLElement | null>(null);
  const [isIf, isElse, isElseIf] = React.useMemo(() => ([checkBool(rIf), checkBool(rElse), checkBool(rElseIf)]), []);
  
  const ref = React.useCallback(node => {
    if (node != null) { 
      if (isElse) {
        console.log('I am GOD', node?.previousElementSibling?.attributes.includes('rif'));
      }
      
    }
  }, []);

  // console.log('test: ', test);

  /**
   * if rIf its reliant on state
   * 
   * if rElseIf its reliant on state
   * 
   * if is rElse, opposite of the node's above's else if all the way up to rIf
   * recursive function going up sibling comps until rIf or not flow comp
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