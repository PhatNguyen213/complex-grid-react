import { useEffect } from "react";
import { ListProps, Product } from "./ListContainer";

const getAll = (): Promise<Product[]> => {
  return fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => data.products);
};

export default function NormalList({ list, onListChange }: ListProps) {
  useEffect(() => {
    getAll().then((value) => {
      onListChange(value);
    });
  }, [onListChange]);

  return (
    <ul className="max-h-[calc(100vh_-_120px)] border p-[40px] overflow-auto">
      {list.map((item) => (
        <div className="border-b p-[10px]" key={item.id}>
          {item.title}
        </div>
      ))}
    </ul>
  );
}
