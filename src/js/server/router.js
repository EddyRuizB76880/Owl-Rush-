//Class based on example provided by professor Jeisson Hidalgo. Available at:
//http://jeisson.ecci.ucr.ac.cr/appweb/2021a/ejemplos/board_game_express/routes/routes.js
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
//import * as eta from 'eta';

import error from './controllers/error.js';
//import game from './controllers/game.js';
import homepage from './controllers/homepage.js';
import log from './controllers/log.js';

const router = express.Router();
const publicMiddleware = express.static(path.join(process.cwd(), '../../../src'));

//console.log(`${path.join(process.cwd(),'..html')}`);
//app.use('/', log);
router.use((req, res, next) => { log.logHttpRequest(req, res, next); });
router.use(bodyParser.urlencoded({ extended: false }));
router.get('/', (req, res) => {
 homepage.getHomepage(req, res);
});


router.post('/game_session', (req, res, next) => {
  //game.postGameBoard(req, res, next);
});

// http://localhost:3000/game_session/18891
router.get('/home_page.xhtml', (req, res, next) => {
  res.sendFile(path.resolve('../../html/home_page.xhtml'));
  //res.setHeader();
});
//ToDo: Discard redundant code


router.get('/game_board.xhtml', (req, res, next) => {
    res.sendFile(path.resolve('../../html/game_board.xhtml'));
    //res.setHeader();
  });

router.get('/lobby.xhtml', (req, res, next) => {
    res.sendFile(path.resolve('../../html/lobby.xhtml'));
    //res.setHeader();
});

router.use(publicMiddleware);
router.use((req, res) => { error.getNotFound(req, res); });

export default router;