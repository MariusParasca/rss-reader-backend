import { Op } from 'sequelize';

import { RESULTS_PER_PAGE } from '@utils/constants.js';
import { RssFeedUrl, RssFeedItem } from '@models';

const RSS_FEED_ITEMS_ATTRIBUTES = ['date', 'title', 'content', 'link', 'guid', 'isoDate'];

export const getAllItemsForAllFeeds = async () => {
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

export const getAllItemsByFeedId = ({ rssFeedUrlIds, offset }) => {
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

export const getCountOfAllItems = ({ rssFeedUrlIds }) => {
  return RssFeedItem.count({ where: { rssFeedUrlId: { [Op.in]: rssFeedUrlIds } } });
};

export const getItemsWithPagination = async ({ rssFeedUrlId, offset }) => {
  const rssFeedUrlIds = rssFeedUrlId.split(';');
  const items = await getAllItemsByFeedId({ rssFeedUrlIds, offset });
  const count = await getCountOfAllItems({ rssFeedUrlIds });

  return { items, count };
};
