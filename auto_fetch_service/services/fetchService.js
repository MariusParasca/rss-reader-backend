const hash = require('hash.js');

const { RssFeedItem } = require('../models/index');
const rssParserService = require('./rssParserService');

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
      return true;
    } catch (err) {
      console.log('Entry already exists');
      return true;
    }
  } else {
    return false;
  }
};

exports.fetchItemsByUrl = async ({ url, id }) => {
  const items = await rssParserService.getRssItemsByURL(url);
  if (items.message) {
    return console.log(items.message);
  }
  return insertFetchedItemsInDb(items.data, id);
};
