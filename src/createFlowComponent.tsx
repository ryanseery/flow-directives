import * as React from 'react';

enum INPUT_TYPE {
  BIGINT = 'bigint',
  BOOLEAN = 'boolean',
  FUNCTION = 'function',
  NUMBER = 'number',
  OBJECT = 'object',
  STRING = 'string',
  UNDEFINED = 'undefined',
}

type KeyValue = {
  [key: string]: any
}

type Item = KeyValue | string | number

export type FlowType = {
  children?: React.ReactElement | string;
  'r-for'?: Item;
  'r-key'?: string | number;
  'r-if'?: boolean;
  'r-else'?: boolean;
  'r-else-if'?: boolean;
};

function determineKey(rKey: FlowType['r-key'], item: Item, index: number): string | number {
  if (typeof item === INPUT_TYPE.OBJECT) {
    return rKey ? (item as KeyValue)[rKey] : index;
  }
  
  return index;
}

type TTag = keyof JSX.IntrinsicElements;

export function createFlowComponent(tag: TTag, props: FlowType) {
  const Tag = tag;

  const { 'r-for': rFor, 'r-key': rKey, 'r-if': rIf = true, children, ...rest } = props;

  if (rFor) {
    // const ref = React.useRef(null);

    return <>{(rFor as Array<Item>).map((item: Item, index: number) => (
      <Tag key={determineKey(rKey, item, index)} {...rest}>
        {typeof children === 'string' ? (
          children
        ) : (
          React.Children.map(children, child => {
            return React.cloneElement(child as React.ReactElement<any>, {item}, null);
          })
        )}
      </Tag>
    ))}</>
  }

  return <Tag>{children}</Tag>;
}