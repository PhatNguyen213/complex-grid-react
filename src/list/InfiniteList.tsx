import { useEffect, useRef, useState } from "react";
import { ListProps, Product } from "./ListContainer";

const getPaginated = (skip: number): Promise<Product[]> =>
  fetch(`https://dummyjson.com/products?limit=20&skip=${skip}&select=title,id`)
    .then((res) => res.json())
    .then((data) => data.products);

export default function InfiniteList({ list, onListChange }: ListProps) {
  const [index, setIndex] = useState(0);
  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPaginated(index).then((value) => {
      onListChange(value);
    });
  }, [onListChange, index]);

  useEffect(() => {
    const ref = listEndRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIndex((prev) => prev + 1);
      }
    });

    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, []);

  return (
    <ul className="max-h-[calc(100vh_-_120px)] border p-[40px] overflow-auto">
      {list.map((item) => (
        <div className="border-b p-[10px]" key={item.id}>
          {item.title}
        </div>
      ))}
      <div ref={listEndRef} />
    </ul>
  );
}
