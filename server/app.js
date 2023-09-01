require('dotenv').config();

const express = require('express');
const config = require('./config/serverConfig');

const app = express();

const PORT = process.env.PORT || 4000;

// const indexRouter = require('./routes/index.routes');

config(app);

// app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`==========> Pppppppppppppppp... ${PORT}...`);
});
