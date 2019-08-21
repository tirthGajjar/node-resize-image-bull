const { app } = require('./index');
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
