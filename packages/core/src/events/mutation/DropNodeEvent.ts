import { ICustomEvent } from '@portalxsk/designable-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class DropNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'drop:node';
}
