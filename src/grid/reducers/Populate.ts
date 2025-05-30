import GridAction from "./GridAction";
import * as _ from "lodash";
import { PopulatePayload } from "./gridReducer";
import Grid from "../models/Grid";

export default class Populate implements GridAction {
  private _payload;
  constructor(payload: PopulatePayload) {
    this._payload = payload;
  }
  action(state: Grid): Grid {
    const { rows, columns, cells } = this._payload;
    state?.populate(rows, columns, cells);
    return _.cloneDeep(state);
  }
}
