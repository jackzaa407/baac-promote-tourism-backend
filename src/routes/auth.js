const express =require('express')
const jwt = require('../utils/genJwtToFrontend')
const router = new express.Router();
const passport = require("passport");
router.get('/', passport.authenticate('headerapikey', { session: false, failureRedirect: '/api/unauthorized' }),(req,res) => {
    try {
        res.json({token:jwt()})
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router