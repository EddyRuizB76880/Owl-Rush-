//Class provided by professor Jeisson Hidalgo. Available at:
//http://jeisson.ecci.ucr.ac.cr/appweb/2021a/ejemplos/board_game_express/routes/routes.js
class ErrorController {
    getNotFound(req, res) {
      res.status(404).send('<h1>404 Not found</h1>\n<p><a href="/">Home</a></p>');
    }
  }
  
  // Singleton
  const error = new ErrorController();
  export default error;