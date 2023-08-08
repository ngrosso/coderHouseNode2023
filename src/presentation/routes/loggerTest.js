import { Router } from "express";

const loggerTestRouter = Router();

loggerTestRouter.get("/", (req, res) => {
  req.logger.fatal("Logger FATAL level test completed!");
  req.logger.error("Logger ERROR level test completed!");
  req.logger.warn("Logger WARN level test completed!");
  req.logger.info("Logger INFO level test completed!");
  req.logger.http("Logger HTTP level test completed!");
  req.logger.debug("Logger DEBUG level test completed!");
  res.send({ succcess: true, message: "Logger test completed!" });
});


export default loggerTestRouter;