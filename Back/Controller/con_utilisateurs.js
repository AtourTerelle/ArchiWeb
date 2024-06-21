const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const utilisateurs = require("../Model/utilisateurs");

exports.getUser = async (req, res) => {

    try {
        const users = await utilisateurs.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({message: "Error"});
    }
}

exports.addutilisateurs = async (req, res) => {

    try {

        const {pseudo_u, mdp_u, role_u} = req.body;

        const hashedPassword = await bcrypt.hash(mdp_u, 10);
        
        const user = new utilisateurs({ 
            pseudo_u,
            mdp_u: hashedPassword,
            role_u,
        })

        const existingUser = await utilisateurs.findOne({pseudo_u: user.pseudo_u});
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        await user.save();

        res.status(200).json({message: "Success"});
    } catch (e) {
        res.status(400).json({message: "Error", });
    }
    
}

exports.modifutilisateurs = async (req, res) => {

    try {

        const userId = req.params.id_u;
        const {newPseudo, newMdp} = req.body;

        const user = await utilisateurs.findOne({ id_u: userId});

        if (user) {
            return res.status(404).json({message: "Utilisateur non trouvé"})
        }

        user.pseudo_u = newPseudo;
        user.mpd_u = newMdp;

        await user.save();

        res.status(200).json({message: "Success", user});
    } catch (e) {
        res.status(400).json({message: "Error"});
    }

    exports.connexion = async (req, res) => {
        try {
            const { pseudo, mdp } = req.body;
    
            // Trouver l'utilisateur par e-mail
            const utilisateur = await utilisateurs.findOne({pseudo_u: pseudo});

            console.log(utilisateur.pseudo_u);
    
            if (!utilisateur) {
                return res.status(401).json({ message: 'Utilisateur inexistant' });
            }
    
            // Comparer le mot de passe
            /*const isMatch = await bcrypt.compare(mdp, utilisateur.mdp_u);
    
            if (!isMatch) {
                return res.status(401).json({ message: 'mot de passe incorect' });
            }*/
           if(mdp!=utilisateur.mdp_u){
                return res.status(401).json({ message: 'mot de passe incorect' });
           }
    
            // Créer un jeton JWT
            const token = jwt.sign(
                { id_u: utilisateur.id_u, pseudo_u: utilisateur.pseudo_u, role_u: utilisateur.role_u },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            //await utilisateur.save();
    
            res.status(200).json({ token });
        } catch (e) {
            res.status(500).json({ message: 'Erreur du serveur', error: e.message });
        }
    }    
}