const mongoose = require("mongoose");
module.exports = (app) => {
  // connect with mongodb and make app listenable from browser
  mongoose
    .connect(
        'mongodb://localhost:27017/apexaccrue'
    )
    .then((data) => {
      app.listen(process.env.PORT || 8500);
      console.log("server started");
    })
    .catch((err) => {
      console.log(err);
    });
};