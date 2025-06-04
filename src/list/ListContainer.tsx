import { useState } from "react";
import PaginatedList from "./PaginatedList";
import NormalList from "./NormalList";
import ListSelection from "./ListSelection";
import { ListChoice } from "../grid/constants";
import InfiniteList from "./InfiniteList";

export interface Product {
  id: number;
  title: string;
}

export type ListProps = {
  list: Product[];
  onListChange: (list: Product[]) => void;
};

const ListType = {
  [ListChoice.NORMAL]: NormalList,
  [ListChoice.PAGINATED]: PaginatedList,
  [ListChoice.INFINITE]: InfiniteList,
};

export default function ListContainer() {
  const [list, setList] = useState<Product[]>([]);
  const [selection, setSelection] = useState<ListChoice>(ListChoice.NORMAL);

  const List = ListType[selection];

  return (
    <div className="flex flex-col max-h-full gap-[12px]">
      <ListSelection selection={selection} onSelect={setSelection} />
      <div className="flex-1">
        <List onListChange={setList} list={list} />
      </div>
    </div>
  );
}
