import * as React from 'react';
import { useRender } from './useRender';
// create shorthands
const e = React.createElement;
const c = React.cloneElement;

export type KeyValue = {
  [key: string]: any;
};

type Item = KeyValue | string | number;

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
  id: string;
}

function randomString(): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
}

function determineKey(rKey: FlowType['r-key'], item: Item, idx: number): string | number {
  if (typeof item === 'object') {
    return rKey ? (item as KeyValue)[rKey] : idx;
  }

  return idx;
}

function FlowComp(props: Comp): JSX.Element | null {
  const { tag, id, children, 'r-if': rIf, 'r-else-if': rElseIf, 'r-else': rElse, ...rest } = props;

  const [render] = useRender({ id, rIf, rElseIf, rElse });

  return render
    ? e(
        tag,
        {
          'data-flow-id': id,
          'data-flow-if': rIf,
          'data-flow-else-if': rElseIf,
          'data-flow-else': rElse,
          ...rest,
        },
        children
      )
    : null;
}
// TODO allow child to be string of item.value
type Child = {
  child?: JSX.Element | string;
  item: Item;
};
function CreateChild({ child, item }: Child): React.ReactElement<any> {
  return c(child as React.ReactElement<any>, { item }, null);
}

export function CreateFlowComponent(tag: Tag, props: FlowType): JSX.Element | null {
  // generate unique id
  const id = React.useMemo(() => randomString(), []);
  // deconstruct
  const { 'r-key': rKey, 'r-for': rFor, children, ...rest } = props;

  // get props needed ready for build
  const defaultProps = { tag, id, children, ...rest };

  if (rFor) {
    return (
      <>
        {(rFor as Array<Item>).map((item: Item, idx: number) => (
          <FlowComp key={determineKey(rKey, item, idx)} {...defaultProps}>
            {React.Children.map(children, child => CreateChild({ child, item }))}
          </FlowComp>
        ))}
      </>
    );
  }

  return <FlowComp {...defaultProps} />;
}
