//Class based on example provided by professor Jeisson Hidalgo. Available at:
//http://jeisson.ecci.ucr.ac.cr/appweb/2021a/ejemplos/board_game_express/routes/routes.js
class HomepageController {
    getHomepage(req, res) {
      res.render('../../home_page', {
        title: 'home_page',
        stylesheets: ['../../css/common.css',
        '../../css/owl_rush_home_page.css'],
        scripts: [],
      });
    }
  }
  
  // Singleton
  const homepage = new HomepageController();
  export default homepage;