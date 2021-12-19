const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.listen(3001, () => {
	console.log('Server listening on port 3001');
})