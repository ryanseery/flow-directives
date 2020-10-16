import * as React from 'react';
import { useRefListener } from './use-ref-listener';

const e = React.createElement;
const c = React.cloneElement;

type KeyValue = {
  [key: string]: any;
};

export type Item = KeyValue | string;

export type FlowType = {
  children?: JSX.Element | JSX.Element[] | string;
  'r-for'?: Item[];
  'r-key'?: string | number;
  'r-if'?: boolean;
  'r-else-if'?: boolean;
  'r-else'?: boolean;
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
  'r-else-if': rElseIf,
  'r-else': rElse,
  children,
  ...rest
}: Comp): JSX.Element | null {
  const [render, ref] = useRefListener({ rIf, rElseIf, rElse });

  console.log({ render, ref });

  return render ? e(tag, { ref, 'data-rif': rIf, 'data-relse': rElse, ...rest }, children) : null;
}

// TODO check props of children to make sure they don't have more than one r-boolean type
// i.e. r-if, r-else-if, r-else each can have r-for
// r-if can't have r-else-if or r-else and so on
export function CreateFlowComponent(tag: Tag, props: FlowType): JSX.Element | null {
  const { 'r-key': rKey, 'r-for': rFor, children } = props;

  const defaultProps = { tag, ...props };

  if (rFor) {
    return (
      <>
        {(rFor as Array<Item>).map((item: Item, index: number) => (
          <FlowComp key={determineKey(rKey, item, index)} {...defaultProps}>
            {React.Children.map(children, child => c(child as React.ReactElement<any>, { item }, null))}
          </FlowComp>
        ))}
      </>
    );
  }

  return <FlowComp {...defaultProps} />;
}
