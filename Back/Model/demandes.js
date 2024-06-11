const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
    id_d: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true },
    materiel_id: { type: Number, required: true },
    type_d: { type: String, required: true },
    en_attente: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('demandes', demandeSchema);