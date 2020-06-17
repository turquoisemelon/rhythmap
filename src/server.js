const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

// app.get('/', (req, res) => res.send('Hello World!'))


router.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2', (req, res) => {
  console.log('res', res)
  return
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))