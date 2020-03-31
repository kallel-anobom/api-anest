const User = require('../models/User');

const generateCryptPassword = require('../utils/generateCryptPassword');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      
      return res.json(users);      
    } catch (err) {
      console.error(err);
    }
  },

  async store(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await User.create({name, email, password});
    
      return res.json(user);
    } catch (err) {
      console.error(err)
    }
  },

  async update(req, res) {
    const { user_id } = req.params; 
    const data = req.body;
    const { password } = req.body === 'password' ? password : '';

    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const userUpdate = await User.update(
        data,
        {
          where: { id: user_id } 
        },
      );

      if ( userUpdate.includes(1) ) {
        res.status(200).json({ id: user_id});
      } else {
        res.status(404).json({ error: 'User id invalid' });
      }

    } catch (err) {
      console.error(err);
    }
  },

  async delete(req, res) {
    const { user_id } = req.params; 
    const { id } = req.body;

    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const task = await Task.findAll({ where: { id } });
      
      task.forEach(task => {
        if ( task.dataValues.id == id ) {
          return task.destroy();
        }
      });

      return res.json();
    } catch (err) {
      console.error(err);
    }
  }
}
