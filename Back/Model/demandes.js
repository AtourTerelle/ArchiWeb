const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
    user_pseudo: { type: String, required: true },
    materiel_nom: { type: String, required: true },
    type_d: { type: String, required: true },
    etats_d: { type: String, required: true, default: "EnAttente" },
    salle_d: { type: String }
});

module.exports = mongoose.model('demandes', demandeSchema);