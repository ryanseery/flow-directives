import { CreateFlowComponent, FlowType } from './createFlowComponent';

// TODO has to be a better way.
export const flow = {
  article: (props: FlowType) => CreateFlowComponent('article', props),
  section: (props: FlowType) => CreateFlowComponent('section', props),
  div: (props: FlowType) => CreateFlowComponent('div', props),
  span: (props: FlowType) => CreateFlowComponent('span', props),
  ul: (props: FlowType) => CreateFlowComponent('ul', props),
  li: (props: FlowType) => CreateFlowComponent('li', props),
  button: (props: FlowType) => CreateFlowComponent('button', props),
  p: (props: FlowType) => CreateFlowComponent('p', props),
};
