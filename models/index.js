const User = require('./User');
const Location = require('./Location');
const Category = require('./Category');


User.hasMany(Location, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Location.belongsTo(User, {
    foreignKey: 'user_id',
});

Location.belongsTo(Category, {
    foreignKey: 'category_id'
});

Category.hasMany(Location, {
    foreignKey: 'category_id'
});

module.exports = {
    Location,
    User,
    Category
};
