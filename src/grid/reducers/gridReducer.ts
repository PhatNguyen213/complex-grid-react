import { SelectionBox } from "@air/react-drag-to-select";
import Cell from "../models/Cell";
import Grid from "../models/Grid";
import GridAction from "./GridAction";

export type PopulatePayload = { rows: number; columns: number; cells: Cell[] };
export type SelectPayload = SelectionBox;
export type ResizePayload = { scrollX: number; scrollY: number };
export type ActionPayload = PopulatePayload & SelectPayload & ResizePayload;

export type State = Grid | null | undefined;

const assertStateNotNull = (state: State) => {
  if (!state) {
    throw new Error("Grid Model cannot be undefined");
  }
};

export default function gridReducer(state: State, action: GridAction) {
  assertStateNotNull(state);
  return action.action(state as Grid);
}
