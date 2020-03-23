const { startdb, app } = require("./DBConnection/mongoose");
const port = process.env.PORT;

startdb();
console.log("Hello BAAC promote tourism app 4");

app.listen(port, () =>
  console.log(`BAAC promote tourism app listening on port ${port}!`)
);

