var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));


var fortunes = [
    "Good fortune is coming your way.",
    "Happiness is just around the corner.",
    "A new opportunity will present itself soon.",
    "Trust yourself, and success will follow.",
    "Your kindness will bring unexpected rewards."
];

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
})

// 404 logging middleware intercept all signal
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// 500 error handling middleware - run at end
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
})

app.get('/')

app.listen(app.get('port'), function() {
    console.log('server started on http://localhost:' + app.get('port'));
});