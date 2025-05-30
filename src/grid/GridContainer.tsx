import { MutableRefObject, useRef } from "react";
import Grid from "../grid/Grid";
import useDragSelection from "../grid/hooks/useDragSelection";
import { GridDataProvider, GridActionProvider } from "./GridProvider";
import useGridModel from "./hooks/useGridModel";
import useGrid from "./hooks/useGrid";

type SelectionGridProps = {
  gridRef: MutableRefObject<HTMLDivElement | null>;
};

function SelectionGrid({
  children,
  gridRef,
}: React.PropsWithChildren<SelectionGridProps>) {
  const gridModel = useGridModel(gridRef);
  const { selectedIndexes, contextValue } = useGrid(gridModel, gridRef);
  const { DragSelection } = useDragSelection(contextValue.select);
  return (
    <GridDataProvider value={selectedIndexes}>
      <GridActionProvider value={contextValue}>
        <DragSelection />
        {children}
      </GridActionProvider>
    </GridDataProvider>
  );
}

export default function GridContainer() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  return (
    <SelectionGrid gridRef={gridRef}>
      <Grid ref={gridRef} />
    </SelectionGrid>
  );
}
