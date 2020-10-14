import { createFlowComponent, FlowType } from './createFlowComponent';

export const flow = {
  article: (props: FlowType) => createFlowComponent('article', props),
  section: (props: FlowType) => createFlowComponent('section', props),
  div: (props: FlowType) => createFlowComponent('div', props),
  ul: (props: FlowType) => createFlowComponent('ul', props),
  li: (props: FlowType) => createFlowComponent('li', props),
}