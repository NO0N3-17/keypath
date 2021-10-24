const { Router }= require('express')
const router = Router()
const controller = require('./controller')
const { addingUsertodb, requireAuth , fetchQuestion , addQuestion, evaluateAnswer, checkUser, requireAdmin, addQueries, fetchQueries, checkAdmin, addResponse, fetchResponse } = require('../middlewares/authMiddlewares')


router.get('/',controller.Homepage);

router.get('/login',controller.loginGet);

router.post('/login',controller.loginPost);

router.get('/logout',controller.logoutGet);

router.post('/register',addingUsertodb,controller.registerPost);

router.get('/register',controller.registerGet);

//Domain

router.get('/domain',controller.domainGet);

router.get('/domain/datascience',controller.datascienceGet);

router.get('/domain/gamedev',controller.gamedevGet);

router.get('/domain/machinelearning',controller.machinelearnGet);

router.get('/domain/webdev',controller.webdevGet);

router.get('/queries',controller.queriesGet);

router.post('/queries',addQueries,controller.queriesPost);

router.get('/question',[ requireAuth , fetchQuestion ],controller.questionGet);

router.get('/admin',controller.adminGet);

router.post('/admin',controller.adminPost);

router.get('/questionadd',requireAdmin,controller.questionaddGet);

router.post('/questionadd',addQuestion,controller.questionaddPost);

router.get('/mentor',controller.mentorGet);

router.post('/result',[ requireAuth, evaluateAnswer , checkUser ,checkAdmin],controller.resultPost);

router.get('/admin/queries',fetchQueries,controller.queriesAdminGet);

router.get('/response',fetchResponse,controller.responseGet);

router.post('/response',[ requireAuth, addResponse , checkUser ,checkAdmin],controller.responsePost);

module.exports = router;