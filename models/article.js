const mongo = require('mongoose');

const articleSchema = new mongo.Schema({
    name: String,
    age: Number,
    category: String
})

const article = mongo.model('Employe',articleSchema);

module.exports=article