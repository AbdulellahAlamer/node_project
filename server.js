const dotenv = require('dotenv');
const mongoose = require('mongoose'); // this works like a fremwork in mongodb
dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD); //connecting to database
// console.log(process.env);

// handle the exception Error golbly and exit the app
// we put this catch error in the top to lisent to any error
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));
// .then((con) => {
//   console.log(con.connection);
// });

const server = app.listen(process.env.PORT, () => {
  console.log('listening.. ');
});
// handle the REJECTION Error golbly and exit the app
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
