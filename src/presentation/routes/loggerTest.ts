import { Router, Request, Response } from 'express';

const loggerTestRouter = Router();

loggerTestRouter.get('/', (req: Request, res: Response) => {
  //(req as any).logger.fatal('Logger FATAL level test completed!');
  (req as any).logger.error('Logger ERROR level test completed!');
  (req as any).logger.warn('Logger WARN level test completed!');
  (req as any).logger.info('Logger INFO level test completed!');
  (req as any).logger.http('Logger HTTP level test completed!');
  (req as any).logger.debug('Logger DEBUG level test completed!');
  res.send({ succcess: true, message: 'Logger test completed!' });
});

export default loggerTestRouter;
