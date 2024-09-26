const userModel = require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CreateUser = async(req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(400).json({
            message: "Please provide username email and password"
        })
        
        return
    }

    try{
        const {username, email, password} = req.body;
        const existingUser = await userModel.findOne({
            email: email,
        });

        if(existingUser){
            res.status(402).json({
                message: "User already exists"
            })
            return
        }
        const saltRounds = 10;
        const hash_password = await bcrypt.hash(password, saltRounds);
        console.log('hashed password', hash_password);
        const user = new userModel({
            username: username,
            email: email,
            password: hash_password
        });

        await user.save();

        res.status(200).json({
            message: 'User Registered Successfully',
            userId: user._id
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        })
        return
    }
}

const login = async(req, res) => {
      const {email, password} = req.body;
      const secret_key = "123rtyuo"

      if(!email || !password){
        res.status(400).json({
            message: "Please enter email and password",
        })
        return
      }

      try{
        const existingUser = await userModel.findOne({
            email: email,
        });

        if(!existingUser){
            res.status(400).json({
                message: "user do not exist"
            })
            return
        }

        const MatchPassword = await bcrypt.compare(password, existingUser.password);

        if(!MatchPassword){
            res.status(401).json({
                message: "Authentication failed: incorrect password"
            })
            return
        }

        const token = jwt.sign({userId: existingUser._id}, secret_key, {expiresIn: '1h',})

        res.status(200).json({
            token: token,
            message: "user logged in successfully",
            userId: existingUser._id
        })


      }catch(err){
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        })
        return
      }
}

const verifyUser = async(req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];//Authorization: Bearer <token>
    if(!token){
        res.status(401).json({
            message: "No token provided, unauthorized"
        })
        return
    }
    try{
        const secret_key = "123rtyuo"
        console.log("hi")
        const decode = await jwt.verify(token, secret_key);
        req.userId = decode.userId;
        console.log("Authorized: ", decode);
        res.status(200).json({
            message: "token verified successfully"
        });

        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = {CreateUser, login, verifyUser};