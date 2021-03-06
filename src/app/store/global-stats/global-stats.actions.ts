import { Action } from '@ngrx/store';
import { GlobalStatsModel } from '../../models/global-stats.model';

export const ASSIGN_GLOBAL_STATS = 'ASSIGN_GLOBAL_STATS';
export const REQUEST_GLOBAL_STATS = 'REQUEST_GLOBAL_STATS';

export class AssignGlobalStats implements Action {
  readonly type = ASSIGN_GLOBAL_STATS;

  constructor(public payload: GlobalStatsModel) {}
}

export class RequestGlobalStats implements Action {
  readonly type = REQUEST_GLOBAL_STATS;
}
