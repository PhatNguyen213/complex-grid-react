import { ForwardedRef, forwardRef, MouseEventHandler, useState } from "react";
import classes from "./Grid.module.css";
import Cell from "./Cell";
import clsx from "clsx";
import { useGridActionsContext, useGridDataContext } from "./GridProvider";

export default forwardRef(function Grid(_, ref: ForwardedRef<HTMLDivElement>) {
  const { resize } = useGridActionsContext();
  const selectedIndexes = useGridDataContext();
  const [resizing, setResizing] = useState(false);

  const onResize = (e: MouseEvent) => resize(e.clientX, e.clientY);

  const handleResize: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    window.addEventListener("mousemove", onResize);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", onResize);
      setResizing(false);
    });
  };

  return (
    <div
      id="grid"
      className={clsx(classes.grid, resizing && classes.resizing)}
      ref={ref}
    >
      {Array.from({ length: 50 }, (_, i) => {
        const selected = selectedIndexes.includes(i);
        return (
          <Cell
            key={i}
            selected={selected}
            resizing={resizing}
            handleResize={handleResize}
          />
        );
      })}
    </div>
  );
});
