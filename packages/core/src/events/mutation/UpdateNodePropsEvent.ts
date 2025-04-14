import { ICustomEvent } from '@portalxsk/designable-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class UpdateNodePropsEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'update:node:props';
}
