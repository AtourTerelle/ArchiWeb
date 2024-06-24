const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    //id_u: { type: Number, required: true, unique: true },
    pseudo_u: { type: String, required: true },
    //mail: { type: String, required: true },
    mdp_u: { type: String, required: true },
    role_u: { type: String, required: true },
    reserve: [{ type: Number }]
});

module.exports = mongoose.model('utilisateurs', utilisateurSchema);