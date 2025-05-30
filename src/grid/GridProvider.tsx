import { SelectionBox } from "@air/react-drag-to-select";
import { createContext, useContext } from "react";

type GridActionsContextType = {
  resize: (scrollX: number, scrollY: number) => void;
  select: (box: SelectionBox) => void;
};
const GridActionsContext = createContext<GridActionsContextType | null>(null);
const GridDataContext = createContext<number[] | null>(null);
const useGridActionsContext = () => {
  const context = useContext(GridActionsContext);
  if (!context) {
    throw new Error(
      "useGridDataContext must be used within a GridDataContextProvider"
    );
  }

  return context;
};

const useGridDataContext = () => {
  const context = useContext(GridDataContext);
  if (!context) {
    throw new Error(
      "useGridActionContext must be used within a GridActionContextProvider"
    );
  }

  return context;
};

const GridActionProvider = GridActionsContext.Provider;
const GridDataProvider = GridDataContext.Provider;
export {
  GridActionProvider,
  GridDataProvider,
  useGridActionsContext,
  useGridDataContext,
};
