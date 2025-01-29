const User = require('./user');
const Vault = require('./vault');

User.hasOne(Vault, { foreignKey: 'vault_id' });
Vault.belongsTo(User, { foreignKey: 'vault_id' });

module.exports = { User, Vault };
