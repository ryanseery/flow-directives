import * as React from 'react';

type KeyValue = {
  [key: string]: any;
};

type Item = KeyValue | string;

export type FlowType = {
  children?: React.ReactElement | string;
  'r-for'?: Item[];
  'r-key'?: string | number;
  'r-if'?: boolean;
  'r-else'?: boolean;
  'r-else-if'?: boolean;
};

type Tag = keyof JSX.IntrinsicElements;

function determineKey(rKey: FlowType['r-key'], item: Item, index: number): string | number {
  if (typeof item === 'object') {
    return rKey ? (item as KeyValue)[rKey] : index;
  }

  return index;
}

export function CreateFlowComponent(tag: Tag, props: FlowType): JSX.Element | null {
  const { 'r-for': rFor, 'r-key': rKey, 'r-if': rIf = true, children, ...rest } = props;

  // single ref
  const ref = React.useRef(null);
  // r-for refs
  const refs = React.useRef(Array.from(rFor ?? [], () => React.createRef()));

  if (rFor) {
    return rIf
      ? React.createElement(
          React.Fragment,
          null,
          (rFor as Array<Item>).map((item: Item, index: number) =>
            React.createElement(
              tag,
              {
                key: determineKey(rKey, item, index),
                ref: refs.current[index],
                ...rest,
              },
              typeof children === 'string'
                ? children
                : React.Children.map(children, child => {
                    return React.cloneElement(child as React.ReactElement<any>, { item }, null);
                  })
            )
          )
        )
      : null;
  }

  return rIf ? React.createElement(tag, { ref }, children) : null;
}
