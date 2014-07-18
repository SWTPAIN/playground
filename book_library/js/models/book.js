var app = app || {};

app.Book = Backbone.Model.extend({
  defaults:{
    coverImage: 'img/eloquent_javascript.png',
    title: 'No Title',
    author: 'Unknown',
    releaseDate: 'Unknown',
    keywords: 'None'
  }
});