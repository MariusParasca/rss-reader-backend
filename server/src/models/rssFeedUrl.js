import Sequelize from 'sequelize';
import uuid from 'uuid/v4';

export default database => {
  const RssFeedUrl = database.define('rss_feed_url', {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: () => uuid() },
    url: { type: Sequelize.STRING, allowNull: false, unique: true },
    title: { type: Sequelize.STRING, allowNull: false },
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'inactive', 'removed'],
      defaultValue: 'active',
      allowNull: false,
    },
  });

  RssFeedUrl.associate = models => {
    RssFeedUrl.hasMany(models.RssFeedItem);
  };

  return RssFeedUrl;
};
