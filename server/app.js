require('@babel/register');
require('dotenv').config();

const express = require('express');
const config = require('./config/serverConfig');

const app = express();

const PORT = process.env.PORT || 4000;

const indexRouter = require('./routes/index.routes');
const fileUpload = require('express-fileupload');

app.use(fileUpload());

config(app);

app.use('/', indexRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`==========> Pppppppppppppppp... ${PORT}...`);
});
