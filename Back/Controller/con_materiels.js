const materiels = require("../Model/materiels");

exports.materielsDispo = async (req, res) => {
    try {
        const materieldispo = await materiels.find({ Reserve_par: null });
        res.status(200).json(materieldispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};