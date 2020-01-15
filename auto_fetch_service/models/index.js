const database = require('./database');
const defineRssFeedUrl = require('./rssFeedUrl');
const defineRssFeedItem = require('./rssFeedItem');

exports.RssFeedUrl = defineRssFeedUrl(database);
exports.RssFeedItem = defineRssFeedItem(database);
