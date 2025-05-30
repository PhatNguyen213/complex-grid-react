import {
  MutableRefObject,
  type Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import gridReducer, { State } from "../reducers/gridReducer";
import Grid from "../models/Grid";
import { SelectionBox } from "@air/react-drag-to-select";
import Cell from "../models/Cell";
import { getScrollXY } from "../utils/helpers";
import Select from "../reducers/Select";
import GridAction from "../reducers/GridAction";
import Populate from "../reducers/Populate";
import Resize from "../reducers/Resize";

export default function useGrid(
  gridModel: Grid,
  ref: MutableRefObject<HTMLDivElement | null>
) {
  const [state, dispatch] = useReducer<Reducer<State, GridAction>>(
    gridReducer,
    gridModel
  );

  const select = useCallback((box: SelectionBox) => {
    dispatch(new Select(box));
  }, []);
  const populate = useCallback(
    (rows: number, columns: number, cells: Cell[]) => {
      dispatch(new Populate({ rows, columns, cells }));
    },
    []
  );

  const resize = useCallback(
    (clientX: number, clientY: number) => {
      const xy = getScrollXY(ref, clientX, clientY);
      if (xy) {
        const { scrollX, scrollY } = xy;
        dispatch(new Resize({ scrollX, scrollY }));
      }
    },
    [ref]
  );

  useEffect(() => {
    populate(gridModel.rows, gridModel.columns, gridModel.cells);
  }, [gridModel, populate]);

  const contextValue = useMemo(
    () => ({
      resize,
      select,
      populate,
    }),
    [resize, select, populate]
  );

  const selectedIndexes = state?.selectedCellIndexes || [];

  return {
    selectedIndexes,
    contextValue,
  };
}
