export type CellDimension = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export default class Cell {
  private _index: number;
  private _selected: boolean;
  private _top: number;
  private _left: number;
  private _width: number;
  private _height: number;
  constructor(index: number, dimension: CellDimension) {
    this._index = index;
    this._selected = false;
    this._height = dimension.height;
    this._top = dimension.top;
    this._left = dimension.left;
    this._width = dimension.width;
  }
  public get index() {
    return this._index;
  }
  public get selected() {
    return this._selected;
  }
  public set selected(selected: boolean) {
    this._selected = selected;
  }
  public get top() {
    return this._top;
  }
  public get width() {
    return this._width;
  }
  public get height() {
    return this._height;
  }
  public get left() {
    return this._left;
  }
}
