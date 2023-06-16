import UserManager from "../../domain/managers/user.manager.js";

export const list = async (req, res) => {
  const{ limit, page } = req.query;
  const manager = new UserManager();
  const users = await manager.paginate({ limit, page });

  res.send({ success: true, data: users.docs, ...users, docs: undefined });
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  const manager = new UserManager();
  const user = await manager.getOne(id);

  res.send({ success: true, message: 'User found.', data: user });
};

export const save = async (req, res) => {
  const manager = new UserManager();
  const user = await manager.create(req.body);

  res.send({ success: true, message: 'User created.', data: user })
};

export const update = async (req, res) => {
  const { id } = req.params;

  const manager = new UserManager();
  const result = await manager.updateOne(id, req.body);

  res.send({ success: true, message: 'User updated.', data: result })
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  const manager = new UserManager();
  await manager.deleteOne(id);

  res.send({ success: true, message: 'User deleted.' })
};
