import * as React from 'react';
import { useRefCallback } from './use-ref-callback';

const e = React.createElement;
const c = React.cloneElement;

type KeyValue = {
  [key: string]: any;
};

type Item = KeyValue | string;

export type FlowType = {
  children?: JSX.Element | JSX.Element[] | string;
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

function FlowComp({
  tag,
  'r-for': rFor,
  'r-key': rKey,
  'r-if': rIf,
  'r-else': rElse,
  children,
  ...rest
}: Comp): JSX.Element | null {
  const [ref] = useRefCallback();

  console.log('shouldRender: ', ref);

  return e(tag, { 'data-rif': rIf, 'data-relse': rElse, ...rest }, children);
}

export function CreateFlowComponent(tag: Tag, props: FlowType): JSX.Element | null {
  const { 'r-key': rKey, 'r-for': rFor, children } = props;

  const defaultProps = { tag, ...props };

  if (rFor) {
    return e(
      React.Fragment,
      null,
      (rFor as Array<Item>).map((item: Item, index: number) => (
        <FlowComp key={determineKey(rKey, item, index)} {...defaultProps}>
          {React.Children.map(children, child => c(child as React.ReactElement<any>, { item }, null))}
        </FlowComp>
      ))
    );
  }

  return <FlowComp {...defaultProps} />;
}
