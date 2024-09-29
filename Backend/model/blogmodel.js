const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    tags: [String], // Assuming tags is an array of strings

    createdBy: {
      type: Schema.Types.ObjectId, // Reference to another document
      ref: 'user', // Name of the model being referenced (assuming you have a User model)
      required: true
    },

    comment: {
        type: String,
    },
}, {timestamps: true});

// Pre-save middleware to automatically set 'createdBy'
blogSchema.pre('save', function(next){
    if(!this.createdBy){
        this.createdBy = this._userId;
    }
    next();
})

const blogModel = mongoose.model('blog', blogSchema);
module.exports = blogModel;