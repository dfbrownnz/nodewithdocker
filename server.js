// server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {

  /**
   * ```
git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin “Your_Repository”

git push -u origin main

```
  */
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running on  http://localhost:${port}/`);
});
