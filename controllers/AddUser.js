const User = require("../model/User");
const bcrypt = require("bcryptjs");

const addUser = async(req,res) => {
    try{
        console.log(req.query);
        let { email, password, username } = req.query;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,
            email,
            password: hash
        });
        await newUser.save();
        res.send("user created!");
    }catch(err){
        console.log(err);
        res.status(500).send("error!");
    }
}

module.exports = { addUser };