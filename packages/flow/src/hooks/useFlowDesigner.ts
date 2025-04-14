import { useContext } from 'react';
import { globalThisPolyfill } from 'portalxsk-designable-shared';
import { FlowDesignerEngineContext } from '../context';

export const useFlowDesigner = () => {
  const context = useContext(FlowDesignerEngineContext);
  return globalThisPolyfill['__ALKAID_FLOW_ENGINE__'] || context;
};
