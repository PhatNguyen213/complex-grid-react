import GridAction from "./GridAction";
import * as _ from "lodash";
import { ResizePayload } from "./gridReducer";
import { calcComponentIndexes } from "../utils/helpers";
import Grid from "../models/Grid";

const assertResizingDownward = (source: number, destination: number) => {
  if (destination === -1 || source === -1 || destination < source) {
    throw new Error("You can only resize down the grid!");
  }
};

export default class Resize implements GridAction {
  private _payload;
  constructor(payload: ResizePayload) {
    this._payload = payload;
  }
  action(state: Grid): Grid {
    const { scrollX, scrollY } = this._payload;
    const originOfComponentToResize = state.smallestIndex;
    const destinationCell = state.getCellIndex(scrollX, scrollY);
    assertResizingDownward(originOfComponentToResize, destinationCell);
    const indexesAfterResize = calcComponentIndexes(
      originOfComponentToResize,
      destinationCell,
      10
    );
    state.setSelectedFromIndexes(indexesAfterResize);
    return _.cloneDeep(state);
  }
}
