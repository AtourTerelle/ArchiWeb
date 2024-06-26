const demandes = require("../Model/demandes");
const materiels = require("../Model/materiels");

exports.createDemande = async (req, res) => {
    try {
        const { pseudo_u, nom_m, type_d, salle_d} = req.body;


        if (type_d == "Attribution"){
                // Vérifier si le matériel est déjà réservé
            const materiel = await materiels.findOne({nom_m: nom_m});
            if (!materiel) {
                return res.status(404).json({ message: "Matériel non trouvé" });
            }
            if (materiel.reserve_par != "Libre") {
                return res.status(400).json({ message: "Matériel déjà réservé" });
            }

            materiel.reserve_par = "Temp_A"
            //materiel.salle = salle

            await materiel.save();

            // Créer une nouvelle demande
            const newDemande = new demandes({
                user_pseudo: pseudo_u,
                materiel_nom: nom_m,
                type_d: type_d,
                salle_d: salle_d
            });

            const savedDemande = await newDemande.save();

            res.status(201).json(savedDemande);

        }
        
        if (type_d == "Retour"){

            const materiel = await materiels.findOne({nom_m: nom_m});
            if (!materiel) {
                return res.status(404).json({ message: "Matériel non trouvé" });
            }

            materiel.reserve_par = "Temp_R"

            await materiel.save();

            // Créer une nouvelle demande
            const newDemande = new demandes({
                user_pseudo: pseudo_u,
                materiel_nom: nom_m,
                type_d: type_d,
                //en_attente: true
            });

            const savedDemande = await newDemande.save();

            res.status(201).json(savedDemande);
        }
        
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.getDemandesEnAttente = async (req, res) => {
    try {
        const demandesEnAttente = await demandes.find({ etats_d: "EnAttente" })//.populate('user').populate('materiel');
        res.status(200).json(demandesEnAttente);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.reponseDemande = async (req, res) => {
    try {
        const { _id, etats_d } = req.body;
        
        const updatedDemande = await demandes.findById({_id})
        if (!updatedDemande) {
            return res.status(404).json({ message: "Demande non trouvée" });
        }
        
        if(updatedDemande.etats_d == "EnAttente"){
            if(updatedDemande.type_d == "Attribution" && etats_d == "Accepte"){
                const materiel = await materiels.findOne({nom_m: updatedDemande.materiel_nom});
                if (!materiel) {
                    return res.status(404).json({ message: "Matériel non trouvé" });
                }
    
                materiel.reserve_par = updatedDemande.user_pseudo
                materiel.salle = updatedDemande.salle_d
    
                await materiel.save()
            }

            if(updatedDemande.type_d == "Attribution" && etats_d == "Refuse"){
                const materiel = await materiels.findOne({nom_m: updatedDemande.materiel_nom});
                if (!materiel) {
                    return res.status(404).json({ message: "Matériel non trouvé" });
                }
    
                materiel.reserve_par = "Libre"
    
                await materiel.save()
            }
            
            if(updatedDemande.type_d == "Retour" && etats_d == "Accepte"){
                const materiel = await materiels.findOne({nom_m: updatedDemande.materiel_nom});
                if (!materiel) {
                    return res.status(404).json({ message: "Matériel non trouvé" });
                }
    
                materiel.reserve_par = "Libre"
                materiel.salle = "Reserve"
    
                await materiel.save()
            }

            if(updatedDemande.type_d == "Retour" && etats_d == "Refuse"){
                const materiel = await materiels.findOne({nom_m: updatedDemande.materiel_nom});
                if (!materiel) {
                    return res.status(404).json({ message: "Matériel non trouvé" });
                }
    
                materiel.reserve_par = updatedDemande.user_pseudo
    
                await materiel.save()
            }
    
            updatedDemande.etats_d=etats_d

            await updatedDemande.save();
            
            res.status(200).json(updatedDemande);
        }else{
            res.status(500).json({ message: "Demande pas en Attente"});
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.DemandesByUser = async (req, res) => {
    try {
        const {pseudo_u} = req.body;

        const demandesByUser = await demandes.find({ user_pseudo: pseudo_u });
        res.status(200).json(demandesByUser);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};