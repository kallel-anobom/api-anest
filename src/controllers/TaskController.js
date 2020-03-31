const User  = require('../models/User');
const Task = require('../models/Task');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    try {
      const user = await User.findByPk(user_id, {
        include: { association: 'tasks' }
      });

      return res.json(user);
    } catch (err) {
      console.error(err);
    }
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { description, responsible, type, status, task_init, task_end } = req.body;

    try {
      const user = await User.findByPk(user_id);
      
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const task = await Task.create({
        user_id,
        description,
        responsible,
        type,
        status,
        task_init,
        task_end 
      });

      return res.json(task);
    } catch (err) {
      console.error(err);
    }
  },

  async update(req, res) {
    const { user_id, task_id } = req.params; 
    const data = req.body;

    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const task = await Task.update(
        data,
        {
          where: { id: task_id } 
        }
      );
      
      if ( task.includes(1) ) {
        res.status(200).json({ id: task_id});
      } else {
        res.status(404).json({ error: 'Task id invalid' });
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
};