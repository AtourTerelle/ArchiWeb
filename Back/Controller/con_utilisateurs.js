const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const utilisateurs = require("../Model/utilisateurs");

const JWT_SECRET = 'La_clef_pas_cacher_la';

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

        console.log(req.params)

        const userId = req.params._id;

        const {newPseudo, newMdp} = req.body;

        console.log(req.body)

        const user = await utilisateurs.findOne({ _id: userId});
        

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
}

exports.connexion = async (req, res) => {

    try {
        console.log(req.body);
        const { pseudo_u, mdp_u } = req.body;
        
        // Trouver l'utilisateur par e-mail
        const utilisateur = await utilisateurs.findOne({pseudo_u: pseudo_u});
        const role = utilisateur.role_u

        if (!utilisateur) {
            return res.status(401).json({ message: 'Utilisateur inexistant' });
        }
    
        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(mdp_u, utilisateur.mdp_u);
    
        if (!isMatch) {
            return res.status(401).json({ message: 'mot de passe incorect' });
        }
        
        console.log("test 3");

        // Créer un jeton JWT
        const token = jwt.sign(
            { id_u: utilisateur.id_u, pseudo_u: utilisateur.pseudo_u, role_u: utilisateur.role_u },
            //process.env.JWT_SECRET,
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        //res.status(200).json({utilisateur, token});
        return res.status(200).send({token, role})
    } catch (e) {
        res.status(500).json({ message: 'Erreur du serveur', error: e.message });
    }
}    