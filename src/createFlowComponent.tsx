import * as React from 'react';
import { useRefListener } from './useRefListener';

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

export interface Comp extends FlowType {
  tag: Tag;
}

function determineKey(rKey: FlowType['r-key'], item: Item, index: number): string | number {
  if (typeof item === 'object') {
    return rKey ? (item as KeyValue)[rKey] : index;
  }

  return index;
}

function FlowComp({ tag, children, 'r-if': rIf, 'r-else': rElse, 'r-else-if': rElseIf, ...rest }: Comp): JSX.Element {
  return e(tag, { 'data-flow-if': rIf, 'data-flow-else': rElse, 'data-flow-else-if': rElseIf, ...rest }, children);
}

// TODO check props of children to make sure they don't have more than one r-boolean type
// i.e. r-if, r-else-if, r-else each can have r-for
// r-if can't have r-else-if or r-else and so on
export function CreateFlowComponent(tag: Tag, props: FlowType): JSX.Element | null {
  const { 'r-key': rKey, 'r-for': rFor, children } = props;
  const defaultProps = { tag, ...props };

  const [render] = useRefListener(defaultProps);

  if (rFor) {
    return render ? (
      <>
        {(rFor as Array<Item>).map((item: Item, index: number) => (
          <FlowComp key={determineKey(rKey, item, index)} {...defaultProps}>
            {React.Children.map(children, child => c(child as React.ReactElement<any>, { item }, null))}
          </FlowComp>
        ))}
      </>
    ) : null;
  }

  return render ? <FlowComp {...defaultProps} /> : null;
}
