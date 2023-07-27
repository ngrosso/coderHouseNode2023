import AppExpress from "../application/appExpress.js";

class AppFactory {
    static create(APP_TYPE) {
        const apps = new Map();
        apps.set('AppExpress', AppExpress);

        const app = apps.get(APP_TYPE);
        return new app();
    }
}

export default AppFactory;
