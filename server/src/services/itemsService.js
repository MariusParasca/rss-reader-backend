const { Op } = require('sequelize');

const { RESULTS_PER_PAGE } = require('../utils/constants');
const { RssFeedUrl, RssFeedItem } = require('../models');

const RSS_FEED_ITEMS_ATTRIBUTES = ['date', 'title', 'content', 'link', 'guid', 'isoDate'];

exports.getAllItemsForAllFeeds = async () => {
  return RssFeedItem.findAll({
    attributes: RSS_FEED_ITEMS_ATTRIBUTES,
    include: [
      {
        model: RssFeedUrl,
        attributes: ['title'],
      },
    ],
  });
};

const getAllItemsByFeedId = ({ rssFeedUrlIds, offset }) => {
  return RssFeedItem.findAll({
    attributes: RSS_FEED_ITEMS_ATTRIBUTES,
    where: { rssFeedUrlId: { [Op.in]: rssFeedUrlIds } },
    include: [
      {
        model: RssFeedUrl,
        attributes: ['title'],
      },
    ],
    order: [['isoDate', 'DESC']],
    offset: offset,
    limit: RESULTS_PER_PAGE,
  });
};

const getCountOfAllItems = ({ rssFeedUrlIds }) => {
  return RssFeedItem.count({ where: { rssFeedUrlId: { [Op.in]: rssFeedUrlIds } } });
};

exports.getItemsWithPagination = async ({ rssFeedUrlId, offset }) => {
  const rssFeedUrlIds = rssFeedUrlId.split(';');
  const items = await getAllItemsByFeedId({ rssFeedUrlIds, offset });
  const count = await getCountOfAllItems({ rssFeedUrlIds });

  return { items, count };
};
