import { memo } from "react";
import clsx from "clsx";

type CellProps = {
  selected: boolean;
  resizing: boolean;
  handleResize: React.MouseEventHandler<HTMLDivElement>;
};

function Cell({ selected, resizing, handleResize }: CellProps) {
  return (
    <div
      data-testid={`grid-cell`}
      className={clsx(
        "relative w-[100px] h-[100px]",
        "border border-[var(--border-color)]",
        selected && "bg-[var(--selection-color)]",
        resizing && "bg-[var(--resizing-color)]"
      )}
    >
      <div
        draggable
        data-disableselect
        className={clsx(
          "cursor-nwse-resize absolute -bottom-px -right-[3px]",
          "border border-x-transparent border-x-[length:var(--resizer-size)] border-t-[#989898] border-t-[length:var(--resizer-size)]",
          "-rotate-45"
        )}
        onMouseDown={handleResize}
      />
    </div>
  );
}

const areEquals = (prevProps: CellProps, currentProps: CellProps) =>
  prevProps.selected === currentProps.selected &&
  prevProps.resizing === currentProps.resizing;

export default memo(Cell, areEquals);
