// Module dependencies.
var application_root = __dirname,
  express = require( 'express' ), //Web framework
  path = require( 'path' ), //Utilities for dealing with file paths
  mongoose = require( 'mongoose' ); //MongoDB integration

mongoose.connect( 'mongodb://localhost/library_database');

var Keywords = new mongoose.Schema({
  keywords: String
});

var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date,
  keywords: [Keywords]
});

var BookModel = mongoose.model('Book', Book);

//Create server
var app = express();

// Configure server
app.configure( function() {
  //parses request body and populates request.body
  app.use( express.bodyParser() );

  //checks request.body for HTTP method overrides
  app.use( express.methodOverride() );

  //perform route lookup based on url and HTTP method
  app.use( app.router );

  //Where to serve static content
  app.use( express.static( path.join( application_root, 'site') ) );

  //Show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

  //Routes
  app.get('/api/books', function(request, response){
    return BookModel.find(function(err, books){
      if ( !err ){
          return response.send(books);
      } else{
          return console.loge(err);
      }
    });
  });

  app.post('/api/books', function(request, response){
    var book = new BookModel({
      title: request.body.title,
      author: request.body.author,
      releaseDate: request.body.releaseDate,
      keywords: request.body.keywords
    });
    return book.save( function(err){
      if (!err){
        console.log('created');
        return response.send(book);
      } else{
        console.log(err);
      }
    });
  });

  app.get('/api/books/:id', function(request, response){
    return BookModel.findById(request.params.id, function(err,book){
      if (!err) {
        return response.send(book);
      } else{
        return console.log(err);
      }
    });
  });

  app.put('/api/books/:id', function(request, response){
    console.log( 'Updating book' + request.body.title);
    return BookModel.findById(request.params.id, function(err, book){
      book.title = request.body.title;
      book.author = request.body.author;
      book.releaseDate = request.body.releaseDate;
      book.keywords = request.body.keywords;

      return book.save( function(err){
        if (!err){
          console.log('Book updated');
          return response.send(book);
        } else {
          console.log(err);
        }
      });
    });
  });

  app.delete( '/api/books/:id', function(request, response){
    console.log('Deleting book with id: '+ request.body.id);
    return BookModel.findById(request.params.id, function(err, book){
      if (!err){
        console.log('Book removed');
        return response.send('');
      } else{
        console.log(err);
      }
    });
  });
});

//Start server
var port = 4711;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

