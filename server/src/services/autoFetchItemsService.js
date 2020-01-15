import HttpStatus from 'http-status-codes';

import { RssFeedUrl } from '@models';

import * as fetchService from '@services/fetchService';

const INTERVAL_TO_REFRESH = 15 * 60 * 1000;

export const autoFetchItemsService = () => {
  console.log('Auto fetch service started');
  setInterval(async () => {
    const rssFeedUrls = await RssFeedUrl.findAll({ raw: true });
    const promises = [];
    for (let i = 0; i < rssFeedUrls.length; i += 1) {
      const rssFeedUrl = rssFeedUrls[i];
      promises.push(fetchService.fetchItemsByUrl({ url: rssFeedUrl.url, id: rssFeedUrl.id }));
    }

    const results = await Promise.all(promises);
    for (let i = 0; i < rssFeedUrls.length; i += 1) {
      if (results[i].status === HttpStatus.OK) {
        console.log(`Successfully fetched for url: ${rssFeedUrls[i].url}`);
      } else {
        console.log('No content');
      }
    }
  }, INTERVAL_TO_REFRESH);
};

export default autoFetchItemsService;
