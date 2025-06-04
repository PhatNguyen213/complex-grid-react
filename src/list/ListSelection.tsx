import { ListChoice } from "../grid/constants";

type ListSelectionProps = {
  selection: ListChoice;
  onSelect: (selection: ListChoice) => void;
};

export default function ListSelection({
  selection,
  onSelect,
}: ListSelectionProps) {
  return (
    <div className="h-[20px]">
      <fieldset>
        <div className="flex gap-[12px]">
          <legend>Select a list type:</legend>
          <input
            onChange={() => onSelect(ListChoice.NORMAL)}
            type="radio"
            id="normal"
            name="list"
            value={ListChoice.NORMAL}
            checked={selection === ListChoice.NORMAL}
          />
          <label htmlFor="normal">Normal</label>
          <input
            onChange={() => onSelect(ListChoice.PAGINATED)}
            type="radio"
            id="paginated"
            name="list"
            value={ListChoice.PAGINATED}
            checked={selection === ListChoice.PAGINATED}
          />
          <label htmlFor="paginated">Paginated</label>
          <input
            onChange={() => onSelect(ListChoice.INFINITE)}
            value={ListChoice.INFINITE}
            checked={selection === ListChoice.INFINITE}
            type="radio"
            id="infinite"
            name="list"
          />
          <label htmlFor="infinite">Infinite</label>
        </div>
      </fieldset>
    </div>
  );
}
