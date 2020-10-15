import { CreateFlowComponent, FlowType } from './createFlowComponent';

export const flow = {
  article: (props: FlowType) => CreateFlowComponent('article', props),
  section: (props: FlowType) => CreateFlowComponent('section', props),
  div: (props: FlowType) => CreateFlowComponent('div', props),
  span: (props: FlowType) => CreateFlowComponent('span', props),
  ul: (props: FlowType) => CreateFlowComponent('ul', props),
  li: (props: FlowType) => CreateFlowComponent('li', props),
};
