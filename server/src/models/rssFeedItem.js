import Sequelize from 'sequelize';

export default database => {
  const RssFeedItem = database.define(
    'rss_feed_item',
    {
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      date: { type: Sequelize.STRING, allowNull: false },
      title: { type: Sequelize.TEXT, allowNull: false },
      link: { type: Sequelize.TEXT, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      guid: { type: Sequelize.TEXT, allowNull: false },
      isoDate: { type: Sequelize.DATE, allowNull: false },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_520_ci',
      timestamps: false,
    },
  );

  RssFeedItem.removeAttribute('id');

  RssFeedItem.associate = models => {
    RssFeedItem.belongsTo(models.RssFeedUrl);
  };

  return RssFeedItem;
};
