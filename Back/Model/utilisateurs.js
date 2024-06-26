const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    pseudo_u: { type: String, required: true },
    mdp_u: { type: String, required: true },
    role_u: { type: String, required: true },
});

module.exports = mongoose.model('utilisateurs', utilisateurSchema);