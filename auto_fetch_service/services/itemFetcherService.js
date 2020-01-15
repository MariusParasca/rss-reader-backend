const fetchService = require('../services/fetchService');

const INTERVAL_TO_REFRESH_FEEDS = 15 * 60 * 1000; // 15 minutes
const FETCH_STEP = 3;

class ItemFetcherService {
  constructor(rssFeedUrls) {
    this._intervalIds = [];
    this._rssFeedUrls = rssFeedUrls;
  }

  async _fetchData(rssFeedUrls) {
    const promises = [];
    for (let i = 0; i < rssFeedUrls.length; i += 1) {
      const rssFeedUrl = rssFeedUrls[i];
      promises.push(fetchService.fetchItemsByUrl({ url: rssFeedUrl.url, id: rssFeedUrl.id }));
    }

    const results = await Promise.all(promises);
    for (let i = 0; i < rssFeedUrls.length; i += 1) {
      if (results[i] === true) {
        console.log(`Successfully fetched for url: ${rssFeedUrls[i].url}`);
      } else {
        console.log('No content');
      }
    }
  }

  _clearIntervals() {
    for (let i = 0; i < this._intervalIds.length; i++) {
      const intervalId = this._intervalIds[i];
      clearInterval(intervalId);
    }
    this._intervalIds = [];
  }

  setIntervalsForFetching() {
    this._clearIntervals();

    let currentRssFeedUrls = [];
    let counter = 0;
    for (let i = 0; i < this._rssFeedUrls.length; i += 1) {
      const rssFeedUrl = this._rssFeedUrls[i];
      if (counter < FETCH_STEP) {
        counter += 1;
        currentRssFeedUrls.push(rssFeedUrl);
      } else {
        const data = [...currentRssFeedUrls];
        this._intervalIds.push(setInterval(() => this._fetchData(data), INTERVAL_TO_REFRESH_FEEDS));
        counter = 1;
        currentRssFeedUrls = [rssFeedUrl];
      }
    }
    this._intervalIds.push(setInterval(() => this._fetchData(currentRssFeedUrls), INTERVAL_TO_REFRESH_FEEDS));
  }
}

module.exports = ItemFetcherService;
