import { MutableRefObject } from "react";

export const getScrollXY = (
  ref: MutableRefObject<HTMLDivElement | null>,
  clientX: number,
  clientY: number
) => {
  if (ref.current) {
    const scrollX = clientX + ref.current.scrollLeft;
    const scrollY = clientY + ref.current.scrollTop;
    // const scrollY = y + appContainerRef.current.scrollTop;
    return { scrollX, scrollY };
  }
};

export const getGridSizeFromMinMaxIndexes = (
  min: number,
  max: number,
  numberOfColumns: number
) => {
  const rowSpan = Math.floor((max - min) / numberOfColumns) + 1;
  const colSpan = ((max - min) % numberOfColumns) + 1;
  return { colSpan, rowSpan };
};

export const calcIndexesFromOriginAndSize = (
  origin: number,
  size: { rowSpan: number; colSpan: number },
  numberOfColumns: number
) => {
  const { rowSpan, colSpan } = size;
  const newIndexes = [];
  for (let r = 0; r < rowSpan; r++) {
    const startingPoint = origin + r * numberOfColumns;
    for (let c = 0; c < colSpan; c++) newIndexes.push(startingPoint + c);
  }
  return newIndexes;
};

export const calcComponentIndexes = (
  origin: number,
  max: number,
  numberOfColumns: number
) => {
  const newSize = getGridSizeFromMinMaxIndexes(origin, max, numberOfColumns);
  return calcIndexesFromOriginAndSize(origin, newSize, numberOfColumns);
};
