const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email : {
        type: String,
        required: true,
        validate: ({
            validator: function(email){
                if( typeof email != undefined){
                    let isValidEmail = validator.isEmail(email)
                    return isValidEmail
                }else{
                    console.error("email is undefined")
                    return false
                }
            }
        },{}),
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: ({validator: function(v){
            return v.length > 8
        }},{message: function(props){
            return `${props.path} must have length 8 but got ${props.value}`
        }})
    }
},{timestamps: true});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;