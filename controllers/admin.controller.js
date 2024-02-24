const adminmongoose = require('../models/adminschema');

const bcrypt = require('bcrypt');


const admin = {
  createadmin: async (req, res) => {
    try{

        const { username, password } = req.body;

        const Hpassword = await bcrypt.hash(password, 10);

        const create = new adminmongoose ({

            username,
            password:Hpassword
        })

       const ress = await create.save();


       if(ress){
        res.json({message:'admin is added'});
       }

    }catch(error){

    }


  },
};

module.exports = admin;
