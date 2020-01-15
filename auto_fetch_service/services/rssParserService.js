const RSSParser = require('rss-parser');

const parser = new RSSParser();

exports.getRssItemsByURL = async (url) => {
  try {
    const feed = await parser.parseURL(url);

    return { data: feed.items, title: feed.title };
  } catch (error) {
    return { message: 'Rss URL (link) is invalid' };
  }
};
