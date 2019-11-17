//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/biblioteca-ngfb'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/biblioteca-ngfb/index.html'));
});
app.listen(process.env.PORT || 8080);
