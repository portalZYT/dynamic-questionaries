import { ICustomEvent } from 'portalxsk-designable-shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class RemoveNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'remove:node';
}
