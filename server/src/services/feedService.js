import HttpStatus from 'http-status-codes';

import { RssFeedUrl } from '@models';
import * as rssParserService from '@services/rssParserService';

export const addRssUrl = async ({ url }) => {
  const rssParserResponse = await rssParserService.getRssItemsByURL(url);

  if (rssParserResponse.status === HttpStatus.NOT_ACCEPTABLE) {
    return rssParserResponse;
  }

  const title = rssParserResponse.title || 'No title';

  const rssFeedUrls = await RssFeedUrl.findOrCreate({
    where: { url },
    defaults: { title },
  });

  if (rssFeedUrls[1]) {
    return { status: HttpStatus.OK, id: rssFeedUrls[0].dataValues.id, title };
  }
  return { status: HttpStatus.NOT_ACCEPTABLE, message: 'Url already exists' };
};

export const change = async ({ id, status }) => {
  const rowsUpdated = await RssFeedUrl.update({ status }, { where: { id } });
  if (rowsUpdated[0] === 1) {
    return { status: HttpStatus.OK, message: 'Ok' };
  }
  return { status: HttpStatus.NO_CONTENT, message: 'Not updated' };
};

export const feeds = async () => {
  return RssFeedUrl.findAll({ attributes: ['id', 'url', 'title'], raw: true, where: { status: 'active' } });
};
