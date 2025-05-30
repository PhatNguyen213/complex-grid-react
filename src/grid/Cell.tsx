import { memo } from "react";
import classes from "./Cell.module.css";
import clsx from "clsx";

type CellProps = {
  selected: boolean;
  resizing: boolean;
  handleResize: React.MouseEventHandler<HTMLDivElement>;
};

function Cell({ selected, resizing, handleResize }: CellProps) {
  return (
    <div
      //   data-testid={`grid-cell-${i}`}
      className={clsx(
        classes.cell,
        selected && classes.selected,
        selected && resizing && classes.resizing
      )}
    >
      <div
        draggable
        data-disableselect
        className={classes.resizer}
        onMouseDown={handleResize}
      />
    </div>
  );
}

const areEquals = (prevProps: CellProps, currentProps: CellProps) =>
  prevProps.selected === currentProps.selected &&
  prevProps.resizing === currentProps.resizing;

export default memo(Cell, areEquals);
