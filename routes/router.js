const { Router }= require('express')
const router = Router()
const controller = require('./controller')
const { addingUsertodb, requireAuth , fetchQuestion , addQuestion } = require('../middlewares/authMiddlewares')


router.get('/',controller.Homepage);

router.get('/login',controller.loginGet);

router.post('/login',controller.loginPost);

router.get('/logout',controller.logoutGet);

router.post('/register',addingUsertodb,controller.registerPost);

router.get('/register',controller.registerGet);

router.get('/domain',controller.domainGet);

router.get('/queries',controller.queriesGet);

router.get('/question',[ requireAuth , fetchQuestion ],controller.questionGet);

router.post('/question',requireAuth,controller.questionPost);

router.get('/questionadd',controller.questionaddGet);

router.post('/questionadd',addQuestion,controller.questionaddPost);

router.get('/mentor',controller.mentorGet);

module.exports = router;