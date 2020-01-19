const HttpStatus = require('http-status-codes');
const RSSParser = require('rss-parser');

const parser = new RSSParser();

exports.getRssItemsByURL = async url => {
  try {
    const feed = await parser.parseURL(url);

    return { status: HttpStatus.OK, data: feed.items, title: feed.title };
  } catch (error) {
    return { status: HttpStatus.NOT_ACCEPTABLE, message: 'Rss URL (link) is invalid' };
  }
};
