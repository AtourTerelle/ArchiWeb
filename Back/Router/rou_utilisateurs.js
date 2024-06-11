const express = require('express');

const router = express.Router();

const con_utilisateurs = require('../Controller/con_utilisateurs');

router.get('/', con_utilisateurs.getUser);
router.post('/', con_utilisateurs.addutilisateurs);
router.put('/:?', con_utilisateurs.modifutilisateurs); // je sais pas la ou y'a des ??