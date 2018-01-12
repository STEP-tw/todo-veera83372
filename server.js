let http = require('http');
let app = require('./app.js');
let server = http.createServer(app);
const PORT = process.env.PORT||5000;
server.on('error',e=>console.error('**error**',e.message));
server.on('listening',()=>console.log(`Dude I am listening on ${server.address().port}`))
server.listen(PORT);
