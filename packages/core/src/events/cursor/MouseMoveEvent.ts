import { ICustomEvent } from '@portalxsk/designable-shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class MouseMoveEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'mouse:move';
}
