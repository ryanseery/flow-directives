import * as React from 'react';
import { useRender } from './useRender';

const e = React.createElement;
const c = React.cloneElement;

export type KeyValue = {
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

export class Cache {
  public data: KeyValue[];
  constructor() {
    this.data = [];
  }
  set(args: KeyValue) {
    this.data.push(args);
  }
  remove(args: KeyValue) {
    const filteredData = this.data.filter(item => item.id !== args.id);
    this.data = [...filteredData];
  }
}

function randomString(): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
}

function determineKey(rKey: FlowType['r-key'], item: Item, index: number): string | number {
  if (typeof item === 'object') {
    return rKey ? (item as KeyValue)[rKey] : index;
  }

  return index;
}

function FlowComp(props: Comp): JSX.Element | null {
  const id = randomString();
  const { tag, children, 'r-if': rIf, 'r-else': rElse, 'r-else-if': rElseIf, ...rest } = props;
  const test = useRender(id, props, [id]);

  console.log('test: ', test);

  return e(
    tag,
    {
      'data-flow-id': id,
      'data-flow-if': rIf,
      'data-flow-else': rElse,
      'data-flow-else-if': rElseIf,
      ...rest,
    },
    children
  );
}

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
