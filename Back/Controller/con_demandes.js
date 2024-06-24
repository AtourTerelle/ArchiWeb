const demandes = require("../Model/demandes");
const materiels = require("../Model/materiels");

exports.createDemande = async (req, res) => {
    try {
        const { pseudo_u, nom_m, type_d } = req.body;

        // Vérifier si le matériel est déjà réservé
        const materiel = await materiels.findOne({nom_m: nom_m});
        if (!materiel) {
            return res.status(404).json({ message: "Matériel non trouvé" });
        }
        console.log(materiel.reserve_par)
        if (materiel.reserve_par != "Libre") {
            return res.status(400).json({ message: "Matériel déjà réservé" });
        }

        // Créer une nouvelle demande
        const newDemande = new demandes({
            user_pseudo: pseudo_u,
            materiel_nom: nom_m,
            type_d: type_d,
            //en_attente: true
        });

        console.log(newDemande)

        const savedDemande = await newDemande.save();

        // Mettre à jour l'état du matériel pour indiquer qu'il est réservé
        materiel.reserve_par = pseudo_u;

        await materiel.save();

        res.status(201).json(savedDemande);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};