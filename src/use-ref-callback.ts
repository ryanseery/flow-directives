import * as React from 'react';

export function useRefCallback() {
  const ref = React.useRef<HTMLElement | null>(null);
  const [state, setState] = React.useState(true);

  // let shouldRender: boolean = true;

  // React.useLayoutEffect(() => {
  //   const { current } = ref;

  //   const refObj = current?.previousElementSibling?.attributes;

  //   if (refObj?.hasOwnProperty('data-rif')) {
  //     // console.log('test: ', refObj.getNamedItem('data-rif').value);
  //     setState(!refObj?.getNamedItem('data-rif')?.value);
  //   }
    
  // }, []);

  const setRef = React.useCallback(node => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
      const refObj = ref?.current?.previousElementSibling?.attributes;

      if (refObj?.hasOwnProperty('data-rif')) {
        // console.log('test: ', refObj.getNamedItem('data-rif').value);

        setState(!refObj?.getNamedItem('data-rif')?.value)
      }
    }

    if (node) {
      const refObj = node.previousElementSibling.attributes;

      if (refObj.hasOwnProperty('data-rif')) {
        // console.log('test: ', refObj.getNamedItem('data-rif').value);
        setState(!refObj.getNamedItem('data-rif').value);

      }
    }

    // Save a reference to the node
    ref.current = node;
  }, []);

  // console.log('shouldRender: ', shouldRender)

  return [setRef, state];
}