import Grid from "../models/Grid";

export default interface GridAction {
  action(state: Grid): Grid;
}
