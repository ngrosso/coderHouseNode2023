import UserManager from "../managers/User.manager.js";
import { createHash, isValidPassword } from "../utils/authCrypt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email && !password) {
      throw new Error('Email and Password invalid format.');
    }

    const manager = new UserManager();
    const user = await manager.getOneByEmail(email);
    if (!user) {
      throw new Error('User not found.');
    }
    const isHashedPassword = await isValidPassword(password, user.password);

    if (!isHashedPassword) {
      return res.status(401).send({ success: false, message: 'Login failed, invalid password.' })
    }

    req.session.user = { email };
    if (user.admin) {
      req.session.user.admin = true;
      return res.status(200).send({ success: true, message: 'Admin Login success!' });
    }

    res.status(200).send({ success: true, message: 'User Login success!' });
  } catch (e) {
    res.status(401).send({ success: false, message: 'Login failed, invalid email or password.', data: e })
  }
};

export const logout = async (req, res) => {
  req.session.destroy(err => {
    if (!err) {
      return res.status(200).send({ success: true, message: 'Logout ok!' });
    }

    res.status(400).send({ success: false, message: 'Logout error!', data: err })
  });
};

export const signup = async (req, res) => {
  const manager = new UserManager();

  try {
    const dto = {
      ...req.body,
      password: await createHash(req.body.password)
    }

    const user = await manager.create(dto);

    res.status(201).send({ success: true, message: 'User created.', data: user });
  } catch (e) {
    res.status(400).send({ success: false, message: 'User created error.', data: e });
  }
};

export const forgetPassword = async (req, res) => {
  const { email, password } = req.body;
  const manager = new UserManager();
  try {
    const dto = {
      email,
      password: await createHash(password)
    };

    const user = await manager.forgetPassword(dto);

    res.status(200).send({ success: true, message: 'User change password.', data: user });
  } catch (e) {
    res.status(400).send({ success: false, message: 'User change password error.', data: e });
  }
};
