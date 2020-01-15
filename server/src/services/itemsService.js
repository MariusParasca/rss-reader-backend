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

export const getAllItemsByFeedId = ({ rssFeedUrlId }) => {
  return RssFeedItem.findAll({
    attributes: RSS_FEED_ITEMS_ATTRIBUTES,
    where: { rssFeedUrlId },
    include: [
      {
        model: RssFeedUrl,
        attributes: ['title'],
      },
    ],
  });
};
