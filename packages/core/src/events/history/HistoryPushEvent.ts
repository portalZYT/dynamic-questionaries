import { ICustomEvent } from 'portalxsk-designable-shared';
import { AbstractHistoryEvent } from './AbstractHistoryEvent';

export class HistoryPushEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:push';
}
