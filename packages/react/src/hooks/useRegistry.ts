import { GlobalRegistry, IDesignerRegistry } from '@portalxsk/designable-core';
import { globalThisPolyfill } from '@portalxsk/designable-shared';

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
