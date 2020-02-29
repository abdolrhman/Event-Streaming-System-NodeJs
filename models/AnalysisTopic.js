class AnalysisTopic {
  /**
   * This is model
   * Wraps The analysis Obj Data
   * @param type
   * @param url
   * @param meta
   */
  constructor(type, url, meta) {
    this.type = type;
    this.url = url;
    this.meta = meta;
  }
  get Url() {
    return this.url;
  }

  get Type() {
    return this.type;
  }

  get Meta() {
    return this.meta;
  }
}

module.exports = AnalysisTopic;