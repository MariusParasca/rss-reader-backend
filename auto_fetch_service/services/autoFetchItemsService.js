const { RssFeedUrl } = require('../models/index');
const fetchService = require('./fetchService');
const FetcherWritableStream = require('../streams/fetcherWritableStream');

require('dotenv').config();

const INTERVAL_TO_CHECK_FOR_NEW_URLS = 60 * 60 * 1000; // one hour

class AutoFetchItemsService {
  constructor() {
    this._begin = 0;
    this._end = 0;
  }

  async _createInterval() {
    const count = await RssFeedUrl.count();
    this._begin = Math.ceil(
      (Number(process.env.DOCKER_NUMBER_ID) / Number(process.env.TOTAL_NUMBER_OF_DOCKERS)) * count,
    );
    this._end = Math.ceil(
      ((Number(process.env.DOCKER_NUMBER_ID) + 1) / Number(process.env.TOTAL_NUMBER_OF_DOCKERS)) * count,
    );
  }

  async _autoFetch() {
    console.log('Auto fetch started');
    const fetcherWritableStream = new FetcherWritableStream();

    await this._createInterval();

    const rssFeedUrlsStream = RssFeedUrl.findAllWithStream({
      attributes: ['url', 'id'],
      raw: true,
      offset: this._begin,
      limit: this._end,
    });

    rssFeedUrlsStream.pipe(fetcherWritableStream);
  }

  async run() {
    console.log('Auto fetch service started');
    this._autoFetch();
    setInterval(this._autoFetch.bind(this), INTERVAL_TO_CHECK_FOR_NEW_URLS);
  }
}

module.exports = AutoFetchItemsService;
