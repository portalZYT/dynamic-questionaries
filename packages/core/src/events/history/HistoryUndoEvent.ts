import { ICustomEvent } from 'portalxsk-designable-shared';
import { AbstractHistoryEvent } from './AbstractHistoryEvent';

export class HistoryRedoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:redo';
}
