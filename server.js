// server.js
const express = require('express');
const app = express();
const port = 3000;

// git pull origin main 
app.get('/localtoweb', (req, res) => {


/***
 * 2. modify the server.js file to include a simple route
 * git add .
git commit -m "Add simple route to server.js"

git branch -M main

git push -u origin main
*/
  res.send('Hello, World! from the web server!');
});

app.get('/', (req, res) => {

  /**
   * ```
1. Create a new Node.js project
  git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin “Your_Repository”

git push -u origin main

```
  */

/***
 * 2. modify the server.js file to include a simple route
 * git add .
git commit -m "Add simple route to server.js"

git branch -M main

git push -u origin main
*/
  res.send('Hello, World! from the web server!');
});

app.listen(port, () => {
  console.log(`Server running on  http://localhost:${port}/`);
});
