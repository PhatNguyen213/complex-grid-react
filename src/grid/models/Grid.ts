import Cell from "./Cell";

export default class Grid {
  private _rows: number;
  private _columns: number;
  private _cells: Cell[];

  constructor(rows?: number, columns?: number, cells?: Cell[]) {
    this._rows = rows || 0;
    this._columns = columns || 0;
    this._cells = cells || [];
  }

  public populate(rows: number, columns: number, cells: Cell[]) {
    this._rows = rows;
    this._columns = columns;
    this._cells = cells;
  }

  public get cells() {
    return this._cells;
  }

  public get rows() {
    return this._rows;
  }

  public get columns() {
    return this._columns;
  }

  public get selectedCells() {
    return this._cells.filter(({ selected }) => selected);
  }

  public setSelectedFromIndexes(indexes: number[]) {
    this.cells.forEach((cell) => {
      if (indexes.includes(cell.index)) {
        cell.selected = true;
      } else {
        cell.selected = false;
      }
    });
  }

  public get selectedCellIndexes() {
    return this.selectedCells.map(({ index }) => index);
  }

  public get smallestIndex() {
    const selected = this._cells.filter(({ selected }) => selected);
    if (selected.length) return selected[0].index;
    return -1;
  }

  public getCellIndex(scrollX: number, scrollY: number) {
    // const scrollY = y + appContainerRef.current.scrollTop;
    return this.cells.findIndex((cell) => {
      const isWithinX =
        scrollX >= cell.left && scrollX <= cell.left + cell.width;
      const isWithinY =
        scrollY >= cell.top && scrollY <= cell.top + cell.height;
      return isWithinY && isWithinX;
    });
  }
}
