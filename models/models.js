const User = require('./User');
const Blog = require('./Blog');

// Creates a relationship between User and Blog model, with the User having a "has many" relationship with Blog model.
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Blog model, with a "belongs to" relationship of the Blog to the User.
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog };
