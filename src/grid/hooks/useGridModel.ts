import { MutableRefObject, useEffect, useRef } from "react";
import Grid from "../models/Grid";
import Cell from "../models/Cell";

const gridModel = new Grid();

export default function useGridModel(
  ref: MutableRefObject<HTMLDivElement | null>
) {
  const runOnce = useRef(false);

  useEffect(() => {
    if (ref.current && !runOnce.current) {
      const cells = Array.from(ref.current.children).map((item, index) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        return new Cell(index, { left, top, width, height });
      });
      gridModel.populate(10, 10, cells);
      runOnce.current = true;
    }
  }, [ref]);

  return gridModel;
}
