const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {sequelize});
    User.beforeCreate(function(user, options) {
      return cryptPassword(user.password)
        .then(success => {
          user.password = success;
        })
        .catch(err => {
          if (err) console.log(err);
        });
    });
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
    this.belongsToMany(models.Role, { foreignKey: 'user_id', through: 'Users_Roles', as: 'roles' });
  }
}

function cryptPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  })
}

module.exports = User;