import UserManager from '../../domain/managers/user.manager.js';
import config from '../../config/index.js';
import task from '../../utils/cron.js';

export const list = async (req, res, next) => {
  const { limit, page } = req.query;
  const manager = new UserManager();
  try {
    const users = await manager.paginate({ limit, page });

    res.status(200).json({ success: true, data: users.docs, ...users, docs: undefined });
  } catch (e) {
    next(e);
  }
};

export const getOne = async (req, res, next) => {
  const { id } = req.params;

  const manager = new UserManager();
  try {
    const user = await manager.getOne(id);

    res.status(200).json({ success: true, message: 'User found.', data: user });
  } catch (e) {
    next(e);
  }
};

export const save = async (req, res, next) => {
  const manager = new UserManager();
  try {
    const user = await manager.create(req.body);

    res.status(201).json({ success: true, message: 'User created.', data: user })
  } catch (e) {
    next(e);
  }
};

export const update = async (req, res, next) => {
  const { id } = req.params;

  const manager = new UserManager();
  try {
    const result = await manager.updateOne(id, req.body);

    res.status(200).json({ success: true, message: 'User updated.', data: result })
  } catch (e) {
    next(e)
  }
};

export const deleteOne = async (req, res, next) => {
  const { id } = req.params;

  const manager = new UserManager();
  try {
    await manager.deleteOne(id);

    res.status(200).json({ success: true, message: 'User deleted.' })
  } catch (e) {
    next(e)
  }
};

export const switchPremiumStatus = async (req, res, next) => {
  const { id } = req.params;

  const manager = new UserManager();
  try {
    const user = await manager.getOne(id);
    if (user.documents.length > 0) {
      user.premium = !user.premium;
    } else {
      throw new Error("Needs to add documentation first!")
    }
    await manager.updateOne(id, user);

    res.status(200).json({ success: true, message: 'User premium role changed.', data: user })
  } catch (e) {
    next(e)
  }
};

export const addDocument = async (req, res, next) => {
  const { id } = req.params;

  const docs = req.docs;
  const docsFolder = `http://${config.HOST_URL}${config.PORT}/images/documents`;

  const docsReferences = docs.map((file) => {
    return {
      name: file.filename,
      reference: `${docsFolder}/${file.filename}`
    }
  })

  const manager = new UserManager();
  try {
    const user = await manager.getOne(id);
    user.documents = docsReferences;
    await manager.updateOne(id, user);

    res.status(200).json({ success: true, message: "Documents uploaded successfully" })
  } catch (e) {
    next(e)
  }
}

export const removeInactiveUsers = async (req, res) => {
  const manager = new UserManager();
  try {
    const users = await manager.removeInactiveUsers();
    res.status(200).json({ success: true, message: (users.length > 0) ? `${users.length} inactive users deleted successfully` : 'No inactive users found', data: users })
  } catch (e) {
    req.logger.error(e.message);
    res.status(500).json({ success: false, message: e.message })
  }
}

export const taskRemoveInactiveUsers = async (req, res) => {

  try {
    if (task._scheduler.timeout) {
      task.stop();
      res.status(200).json({ success: true, message: "Cron: Remove inactive users schedule stopped" })
    } else {
      task.start();
      res.status(200).json({ success: true, message: "Cron: Remove inactive users schedule started" })
    }
  } catch (e) {
    req.logger.error(e.message);
    res.status(500).json({ success: false, message: e.message })
  }
}


