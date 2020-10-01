const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/authRoutes'));

async function start () {
	try{
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
	}
	catch (e){
		console.log('Server Error', e.message);
		process.exit(1);
	}
}

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...!`));

start()
