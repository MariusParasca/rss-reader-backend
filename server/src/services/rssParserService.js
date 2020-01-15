import HttpStatus from 'http-status-codes';
import RSSParser from 'rss-parser';

const parser = new RSSParser();

export const getRssItemsByURL = async url => {
  try {
    const feed = await parser.parseURL(url);

    return { status: HttpStatus.OK, data: feed.items, title: feed.title };
  } catch (error) {
    return { status: HttpStatus.NOT_ACCEPTABLE, message: 'Rss URL (link) is invalid' };
  }
};

export default getRssItemsByURL;
