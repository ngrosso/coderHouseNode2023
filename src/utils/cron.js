import cron from 'node-cron'
import { logger } from '../utils/logger.js'
import UserManager from '../domain/managers/user.manager.js'

// const task = cron.schedule('0 0 */2 * *', () => {

const removeInactiveUsers = async () => {
  logger.info('Cron job running every 1 minutes.')
  const manager = new UserManager();
  try {
    const users = await manager.removeInactiveUsers();
    logger.info((users.length > 0) ? `${users.length} inactive users deleted successfully` : 'No inactive users found')
  } catch (e) {
    logger.error(e.message);
    task.stop();
  }
}

const task = await cron.schedule('*/1 * * * *', removeInactiveUsers, {
  scheduled: false,
  timezone: "America/Argentina/Buenos_Aires"
})

export default task