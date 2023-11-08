const User = require('./User');
const Location = require('./Location');
const Category = require('./Category');

User.hasOne(Location, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Location.belongsTo