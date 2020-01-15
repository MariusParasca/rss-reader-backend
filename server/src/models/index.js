import database from './database';
import defineRssFeedItem from './rssFeedItem';
import defineRssFeedUrl from './rssFeedUrl';

export const RssFeedItem = defineRssFeedItem(database);
export const RssFeedUrl = defineRssFeedUrl(database);
