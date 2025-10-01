import AppExpress from '../application/appExpress.js';

class AppFactory {
  static create(APP_TYPE: string): AppExpress {
    const apps = new Map<string, typeof AppExpress>();
    apps.set('AppExpress', AppExpress);

    const app = apps.get(APP_TYPE);
    if (!app) {
      throw new Error(`App type ${APP_TYPE} not found`);
    }
    return new app();
  }
}

export default AppFactory;
