const { Model, DataTypes } = require('sequelize');

class Role extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'role_id', through: 'Users_Roles', as: 'users' });
  }
}

module.exports = Role;