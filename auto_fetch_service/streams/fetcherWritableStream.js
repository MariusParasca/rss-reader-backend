const { Writable } = require('stream');
const ItemFetcherService = require('../services/itemFetcherService');

class FetcherWritableStream extends Writable {
  _write(chunk, encoding, callback) {
    const itemFetcherService = new ItemFetcherService(JSON.parse(chunk.toString()));
    itemFetcherService.setIntervalsForFetching();
    callback();
  }
}

module.exports = FetcherWritableStream;
