const Role = require('../models/Role');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params; 

    try {
      const user = await User.findByPk(user_id, {
        include: { association: 'roles', through: { attributes: [] } }
      });

      return res.json(user.roles)
    } catch (err) {
      console.error(err);
    }
  },

  async store(req, res) {
    const { user_id } = req.params; 
    const { name } = req.body;

    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const [ role ] = await Role.findOrCreate({ where: { name } });

      await user.addRole(role);

      return res.json(role);
    } catch (err) {
      console.error(err);
    }
  },

  async update(req, res) {
    const { user_id } = req.params; 
    const data = res.body;

    console.log(data);
  },

  async delete(req, res) {
    const { user_id } = req.params; 
    const { name } = req.body;

    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const role = await Role.findOne({ where: { name } });

      await user.removeRole(role);

      return res.json();
    } catch (err) {
      console.error(err);
    }
  }
}