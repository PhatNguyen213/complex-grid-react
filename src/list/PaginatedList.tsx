import { useEffect, useState } from "react";
import { ListProps, Product } from "./ListContainer";

const PaginationButton = ({
  page,
  selected,
  onChange,
}: {
  page: string;
  selected?: boolean;
  onChange: (page: number) => void;
}) => (
  <button
    onClick={() => onChange(parseInt(page) - 1)}
    className={`text-[18px] cursor-pointer ${
      selected ? "font-[800]" : "font-[400]"
    } `}
  >
    {page}
  </button>
);

const getPaginated = (skip: number): Promise<Product[]> =>
  fetch(`https://dummyjson.com/products?limit=20&skip=${skip}&select=title,id`)
    .then((res) => res.json())
    .then((data) => data.products);

export default function PaginatedList({ list, onListChange }: ListProps) {
  const [pagination, setPagination] = useState<{ limit: number; skip: number }>(
    { limit: 10, skip: 0 }
  );

  useEffect(() => {
    getPaginated(pagination.skip).then((value) => {
      onListChange(value);
    });
  }, [onListChange, pagination.skip]);

  const onChangePage = (page: number) => {
    setPagination((prev) => ({ ...prev, skip: page }));
  };

  return (
    <>
      <ul className="max-h-[calc(100vh_-_140px)] overflow-auto border p-[20px]">
        {list.map((item) => (
          <div className="border-b p-[10px]" key={item.id}>
            {item.title}
          </div>
        ))}
      </ul>
      <div className="flex gap-[12px] mt-[10px]">
        <PaginationButton page="&laquo;" onChange={onChangePage} />
        <PaginationButton
          selected={pagination.skip === 0}
          page="1"
          onChange={onChangePage}
        />
        <PaginationButton
          selected={pagination.skip === 1}
          page="2"
          onChange={onChangePage}
        />
        <PaginationButton
          selected={pagination.skip === 2}
          page="3"
          onChange={onChangePage}
        />
        <PaginationButton
          selected={pagination.skip === 3}
          page="4"
          onChange={onChangePage}
        />
        <PaginationButton page="&raquo;" onChange={onChangePage} />
      </div>
    </>
  );
}
