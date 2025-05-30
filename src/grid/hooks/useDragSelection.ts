import { SelectionBox, useSelectionContainer } from "@air/react-drag-to-select";

const selectionStyle = {
  border: "2px dashed purple",
  borderRadius: 4,
  backgroundColor: "brown",
  opacity: 0.5,
};

export default function useDragSelection(
  selectFn: (box: SelectionBox) => void
) {
  const { DragSelection } = useSelectionContainer({
    shouldStartSelecting: (target) => {
      if (target instanceof HTMLElement) {
        let el = target;
        while (el.parentElement && !el.dataset.disableselect) {
          el = el.parentElement;
        }
        return el.dataset.disableselect !== "true";
      }
      return false;
    },
    eventsElement: document.getElementById("root"),
    onSelectionChange: (box) => {
      selectFn(box);
    },
    selectionProps: {
      style: selectionStyle,
    },
    isEnabled: true,
  });

  return {
    DragSelection,
  };
}
