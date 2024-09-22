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
        required: true,
    },
    comment: {
        type: String,
    },
}, {timestamps: true});

const blogModel = mongoose.model('blog', blogSchema);
module.exports = blogModel;