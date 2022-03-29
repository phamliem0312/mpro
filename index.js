const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(express.json({
  limit: '50mb'
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/gui_route'));
//app.use('/api/user', require('./routes/user_route'));
app.use('/api/user', require('./routes/user_route'));
app.use('/api/role', require('./routes/role_route'));
//app.use('/api/role/permission', require('./routes/permission_route'));
app.use('/api/permission', require('./routes/permission_route'));
app.use('/api/system', require('./routes/system_route'));
app.use('/api/param', require('./routes/param_route'));
app.use('/api/service', require('./routes/service_route'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})