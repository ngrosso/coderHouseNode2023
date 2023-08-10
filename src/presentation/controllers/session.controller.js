import UserManager from '../../domain/managers/user.manager.js';
import { verifyToken } from '../../shared/auth.js';
import { createHash, isValidPassword, generateToken } from '../../shared/auth.js';
import { forgotPasswordMailer } from '../../shared/mailer.js';


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email && !password) {
      throw new Error('Email and Password invalid format.');
    }

    const manager = new UserManager();
    const user = await manager.getOneByEmail(email);
    const role = (user.admin) ? 'Admin' : 'User';
    if (!user) {
      throw new Error('User not found.');
    }
    const isHashedPassword = await isValidPassword(password, user.password);

    if (!isHashedPassword) {
      return res.status(401).send({ success: false, message: 'Login failed, invalid password.' })
    }

    const accessToken = await generateToken(user);

    res.cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.status(200).send({ success: true, message: `${(role)} Login success!` });
  } catch (e) {
    req.logger.error(e);
    res.status(401).send({ success: false, message: 'Login failed, invalid email or password.', data: e.message })
  }
};

export const logout = async (req, res) => {
  res.clearCookie('accessToken').send({ success: true, message: 'Logout ok!' });

  // req.session.destroy(err => {
  //   if (!err) {
  //     return res.status(200).send({ success: true, message: 'Logout ok!' });
  //   }

  //   res.status(400).send({ success: false, message: 'Logout error!', data: err })
  // });
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
    req.logger.error(e);
    res.status(400).send({ success: false, message: 'User created error.', data: e });
  }
};

export const changePassword = async (req, res) => {
  const { email, password } = req.body;
  const manager = new UserManager();

  try {
    const dto = {
      email,
      password: await createHash(password)
    };

    const user = await manager.changePassword(dto);

    res.status(200).send({ success: true, message: 'User change password.', data: user });
  } catch (e) {
    req.logger.error(e);
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
    res.status(200).send({ success: true, message: 'Recovery Mail sent.',data: mail.response });
  } catch (e) {
    req.logger.error(e);
    res.status(400).send({ success: false, message: 'Recovery Mail sent error.', data: e.message });
  }
}

export const forgotPasswordView = async (req, res) => {
  const { token } = req.query;
  res.render('forgot-password', { title: 'Password Reset', token: token });
}

export const changeForgotPassword = async (req, res) => {
  const { token, password, repeatPassword } = req.body;
  const manager = new UserManager();

  try {
    if (password !== repeatPassword) throw new Error("Passwords don't match");
    const { user } = await verifyToken(token);
    const dto = {
      email: user.email,
      password: await createHash(password)
    };

    const userDoc = await manager.changePassword(dto);

    res.status(200).send({ success: true, message: 'User password changed.', data: userDoc });
  } catch (e) {
    req.logger.error(e);
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
    req.logger.error(e);
    res.status(400).send({ success: false, data: e.message });
  }
};
