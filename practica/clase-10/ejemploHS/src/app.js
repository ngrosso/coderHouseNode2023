import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';

void (async () => {

  try {
    const app = express();

    const PORT = 8080;
    const viewPath = resolve('src/views');
    app.engine('handlebars', engine({
      layoutsDir: `${viewPath}/layouts`,
      defaultLayout: `${viewPath}/layouts/main.handlebars`,
    }));
    app.set('view engine', 'handlebars');
    app.set('views', viewPath);

    app.get('/', (req, res) => {
      res.render('greetings', { title: 'Home', name: 'Juan' });

    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (e) {
    console.log(e);
  }

})();
