const materiels = require("../Model/materiels");

exports.materielsDispo = async (req, res) => {
    try {
        const materieldispo = await materiels.find({ Reserve_par: null });
        res.status(200).json(materieldispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.materielsDispoByType = async (req, res) => {
    try {
        console.log(req.params)
        const { type } = req.params;
        const materielsdispo = await materiels.find({ Type: type, Reserve_par: null });
        res.status(200).json(materielsdispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};