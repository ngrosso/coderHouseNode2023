
const errorHandler = (err, req, res, next) => {

  if (err?.name.includes('ZodError')) {
    req.logger.warn(err.stack);
    return res.status(400).json({ success: false, message: err.issues });
  } else if (err?.message.includes('Login failed, invalid user or password.')) {
    req.logger.warn(err.stack);
    return res.status(401).send({ success: false, message: 'Login failed, invalid user or password.' })
  } else if (err?.message.includes("User is not active.")) {
    req.logger.warn(err.stack);
    return res.status(401).send({ success: false, message: err.message })
  } else if (err?.message.includes('Email and Password invalid format.')) {
    req.logger.warn(err.stack);
    return res.status(401).send({ success: false, message: 'Email and Password invalid format.' })
  } else if (err?.message.includes("Not Found!")) {
    req.logger.warn(err.stack);
    return res.status(404).send({ success: false, message: err.message })
  } else if ((/(email{1,3}|duplicate{1})/g).test(err?.message)) {
    req.logger.warn(err.stack);
    return res.status(400).send({ success: false, message: "Email already taken" })
  } else if (err?.message.includes("Needs to add documentation first!") || err?.message.toLowerCase().includes("file") || err?.message.includes("Product Code") || err?.message.includes("User already") || err?.message.includes("empty")) {
    req.logger.warn(err.stack);
    return res.status(400).send({ success: false, message: err.message })
  } else if (err?.message.includes("User doesn't own") || err?.message.includes("User cart missmatch")) {
    req.logger.warn(err.stack);
    return res.status(403).send({ success: false, message: err.message })
  }

  req.logger.error(err.stack);
  res.status(500).json({ success: false, message: 'Ocurrió un error' });
};

export default errorHandler;