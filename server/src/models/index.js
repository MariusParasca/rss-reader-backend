const database = require('./database');
const defineRssFeedItem = require('./rssFeedItem');
const defineRssFeedUrl = require('./rssFeedUrl');

exports.RssFeedItem = defineRssFeedItem(database);
exports.RssFeedUrl = defineRssFeedUrl(database);
