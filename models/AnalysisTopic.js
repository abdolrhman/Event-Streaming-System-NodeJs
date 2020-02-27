class AnalysisTopic {
  /**
   * This is model
   * Wraps The analysis Obj Data
   * @param type
   * @param url
   * @param meta
   */
  constructor(type, url, meta) {
    this._Type = type;
    this._Url = url;
    this._Meta = meta;
  }
  get Url() {
    return this._Url;
  }

  get Type() {
    return this._Type;
  }

  get Meta() {
    return this._Meta;
  }
}
