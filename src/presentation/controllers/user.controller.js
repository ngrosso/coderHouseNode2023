import UserManager from '../../domain/managers/user.manager.js';
import config from '../../config/index.js';

export const list = async (req, res) => {
  const { limit, page } = req.query;
  const manager = new UserManager();
  try {
    const users = await manager.paginate({ limit, page });

    res.status(200).json({ success: true, data: users.docs, ...users, docs: undefined });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ success: false, message: e.message });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  const manager = new UserManager();
  try {
    const user = await manager.getOne(id);

    res.status(200).json({ success: true, message: 'User found.', data: user });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ success: false, message: e.message });
  }
};

export const save = async (req, res) => {
  const manager = new UserManager();
  try {
    const user = await manager.create(req.body);

    res.status(201).json({ success: true, message: 'User created.', data: user })
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ success: false, message: e.message })
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  const manager = new UserManager();
  try {
    const result = await manager.updateOne(id, req.body);

    res.status(200).json({ success: true, message: 'User updated.', data: result })
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ success: false, message: e.message })
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  const manager = new UserManager();
  try {
    await manager.deleteOne(id);

    res.status(200).json({ success: true, message: 'User deleted.' })
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).json({ success: false, message: e.message })
  }
};

export const switchPremiumStatus = async (req, res) => {
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
    req.logger.error(e.message);
    res.status(400).json({ success: false, message: e.message })
  }
};

export const addDocument = async (req, res) => {
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
    req.logger.error(e.message);
    res.status(400).json({ success: false, message: e.message })
  }
}
