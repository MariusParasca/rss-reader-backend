import hash from 'hash.js';
import HttpStatus from 'http-status-codes';

import { RssFeedUrl, RssFeedItem } from '@models';
import * as rssParserService from './rssParserService';

const createEntry = (item, rssFeedId) => {
  return {
    rssFeedUrlId: rssFeedId,
    hash: hash
      .sha256()
      .update(item.date + item.link)
      .digest('hex'),
    date: item.pubDate || item.date,
    title: item.title,
    link: item.link,
    content: item.content || '',
    guid: item.guid,
    isoDate: item.isoDate,
  };
};

const insertItemsInDb = async (items, id) => {
  const promises = [];
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    promises.push(RssFeedItem.create(createEntry(item, id)));
  }

  return Promise.all(promises);
};

const insertFetchedItemsInDb = async (itemsData, rssFeedUrlId) => {
  if (itemsData) {
    try {
      await insertItemsInDb(itemsData, rssFeedUrlId);
      return { status: HttpStatus.OK, message: 'ok' };
    } catch (err) {
      console.log('Entry already exists');
      return { status: HttpStatus.OK, message: 'ok' };
    }
  } else {
    return { status: HttpStatus.NO_CONTENT, message: 'Not found' };
  }
};

export const getItemsByFeedId = async ({ id }) => {
  const rssFeed = await RssFeedUrl.findOne({ where: { id }, raw: true });
  if (!rssFeed) {
    return { status: HttpStatus.NO_CONTENT, message: 'Not found' };
  }
  const items = await rssParserService.getRssItemsByURL(rssFeed.url);
  return insertFetchedItemsInDb(items.data, id);
};

export const fetchItemsByUrl = async ({ url, id }) => {
  const items = await rssParserService.getRssItemsByURL(url);
  return insertFetchedItemsInDb(items.data, id);
};
