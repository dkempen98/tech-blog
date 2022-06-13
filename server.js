const express = require('express');
const path = require('path');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
})