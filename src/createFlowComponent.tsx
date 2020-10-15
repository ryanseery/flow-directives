import * as React from 'react';

const e = React.createElement;
const c = React.cloneElement;

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

interface Comp extends FlowType {
  tag: Tag;
}

function determineKey(rKey: FlowType['r-key'], item: Item, index: number): string | number {
  if (typeof item === 'object') {
    return rKey ? (item as KeyValue)[rKey] : index;
  }

  return index;
}

function FlowCompArr({
  tag,
  'r-for': rFor,
  'r-key': rKey,
  'r-if': rIf = true,
  children,
  ...rest
}: Comp): JSX.Element | null {
  // TODO previousElementSibling / attributes / nodeValue
  const refs = React.useRef(Array.from(rFor ?? [], () => React.createRef()));
  console.log('refs: ', refs);

  return rIf
    ? e(
        React.Fragment,
        null,
        (rFor as Array<Item>).map((item: Item, index: number) =>
          e(
            tag,
            {
              key: determineKey(rKey, item, index),
              ref: refs.current[index],
              ...rest,
            },
            typeof children === 'string'
              ? children
              : React.Children.map(children, child => c(child as React.ReactElement<any>, { item }, null))
          )
        )
      )
    : null;
}

function FlowComp({
  tag,
  'r-for': rFor,
  'r-key': rKey,
  'r-if': rIf = true,
  'r-else': rElse,
  children,
  ...rest
}: Comp): JSX.Element | null {
  // TODO previousElementSibling / attributes / nodeValue
  const ref = React.useRef(null);
  console.log('ref: ', ref);

  return rIf ? e(tag, { ref, 'data-rif': rIf, 'data-relse': rElse, ...rest }, children) : null;
}

export function CreateFlowComponent(tag: Tag, props: FlowType): JSX.Element | null {
  const { 'r-for': rFor } = props;

  const defaultProps = { tag, ...props };

  if (rFor) {
    return <FlowCompArr {...defaultProps} />;
  }

  return <FlowComp {...defaultProps} />;
}
