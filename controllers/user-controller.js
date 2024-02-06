const user = {
  UserSignup: (req, res) => {
    console.log(req.body);
    // res.json('I am working');
    // console.log('I\'m working');
    res.json('error');
  },
};

module.exports = user;
