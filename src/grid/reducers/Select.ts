import GridAction from "./GridAction";
import * as _ from "lodash";
import { SelectPayload } from "./gridReducer";
import { Box, boxesIntersect } from "@air/react-drag-to-select";
import Cell from "../models/Cell";
import Grid from "../models/Grid";

export default class Select implements GridAction {
  private _payload;
  constructor(payload: SelectPayload) {
    this._payload = payload;
  }
  action(state: Grid): Grid {
    const box = this._payload;
    const scrollAwareBox: Box = {
      ...box,
      top: box.top + window.scrollY,
      left: box.left + window.scrollX,
    };

    const selectableCells = state.cells as Box[];
    selectableCells.forEach((cell) => {
      if (boxesIntersect(scrollAwareBox, cell)) {
        (cell as Cell).selected = true;
      } else {
        (cell as Cell).selected = false;
      }
    });
    return _.cloneDeep(state);
  }
}
