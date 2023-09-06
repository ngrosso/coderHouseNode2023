import UserManager from '../../domain/managers/user.manager.js';
import { verifyToken } from '../../shared/auth.js';
import { isValidPassword, generateToken } from '../../shared/auth.js';
import { forgotPasswordMailer } from '../../shared/mailer.js';


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email && !password) throw new Error('Email and Password invalid format.');

    const manager = new UserManager();
    const user = await manager.getOneByEmail(email);
    if (!user) throw new InvalidUserPasswordError();
    if (!user.status) throw new Error("User is not active.");

    const role = (user.admin) ? 'Admin' : 'User';

    const isHashedPassword = await isValidPassword(password, user.password);
    if (!isHashedPassword) throw new InvalidUserPasswordError();
    const accessToken = await generateToken(user);

    user.lastConnection = Date.now();
    await manager.updateOne(user.id, user);

    res.cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.status(200).send({ success: true, message: `${role} Login success!` });
  } catch (e) {
    next(e)
  }
};

export const logout = async (req, res, next) => {
  const { user } = await verifyToken(req.cookies.accessToken);
  const manager = new UserManager();
  user.lastConnection = Date.now();
  try {
    await manager.updateOne(user.id, user);
    res.clearCookie('accessToken').send({ success: true, message: 'Logout ok!' });
  } catch (e) {
    next(e)
  }
};

export const signup = async (req, res) => {
  const manager = new UserManager();

  try {
    const dto = {
      ...req.body,
      lastConnection: Date.now(),
      cart: undefined,
      admin: false,
      premium: false,
      documents: [],
      status: true
    }

    const userDoc = await manager.create(dto);

    const user = {
      ...userDoc,
      lastConnection: new Date(userDoc.lastConnection)
    }

    res.status(201).send({ success: true, message: 'User created.', data: user });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).send({ success: false, message: 'User created error.', data: e.message });
  }
};

export const changePassword = async (req, res) => {
  const { password } = req.body;
  const user = req.userInfo;
  const manager = new UserManager();

  try {

    const changedUserPw = await manager.changePassword({ email: user.email, password: password });

    res.status(200).send({ success: true, message: 'User change password.', data: changedUserPw });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).send({ success: false, message: 'User change password error.', data: e });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const manager = new UserManager();

  try {
    const user = await manager.getOneByEmail(email);
    const accessToken = await generateToken(user);
    const mail = await forgotPasswordMailer(email, accessToken);
    res.status(200).send({ success: true, message: 'Recovery Mail sent.', data: mail.response });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).send({ success: false, message: 'Recovery Mail sent error.', data: e.message });
  }
}

export const forgotPasswordView = async (req, res) => {
  const { token } = req.query;
  res.status(200).render('forgot-password', { title: 'Password Reset', token: token });
}

export const changeForgotPassword = async (req, res) => {
  const { token, password, repeatPassword } = req.body;
  const manager = new UserManager();

  try {
    if (password !== repeatPassword) throw new Error("Passwords don't match");
    const { user } = await verifyToken(token);

    const userDoc = await manager.changePassword({ email: user.email, password: password });

    res.status(200).render('change-password-success', { title: 'Password Reset Success', user: userDoc.firstName });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).send({ success: false, message: 'User password change error.', data: e.message });
  }
};

export const current = async (req, res) => {
  const manager = new UserManager();
  const { user } = await verifyToken(req.cookies.accessToken);

  try {
    const userDoc = await manager.getOne(user.id);
    res.status(200).send({ success: true, data: userDoc });
  } catch (e) {
    req.logger.error(e.message);
    res.status(400).send({ success: false, data: e.message });
  }
};

class InvalidUserPasswordError extends Error {
  constructor() {
    super('Login failed, invalid user or password.');
  }
}
