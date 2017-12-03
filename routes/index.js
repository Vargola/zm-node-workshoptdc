var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	global.db.findAll((err, docs) => {
		if(err) { return console.log(err); }
		res.render('index', { title: 'Lista de Clientes', docs: docs });
	});
});

router.get('/new', function(req, res, next) {
	res.render('new', { title: 'Novo Cadastro', doc: { "nome":"", "idade":"" }, action: '/new' });
});

router.post('/new', function(req, res, next) {
	var nome = req.body.nome;
	var idade = parseInt(req.body.idade);
	global.db.insert({nome, idade}, (err, result) => {
		if(err) { return console.log(err); }
		res.redirect('/');
	});
});

router.get('/edit/:id', function(req, res, next) {
	var id = req.params.id;
	global.db.findOne(id, (err, docs) => {
		if(err)	{ return console.log(err); }
		res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id });
	});
});

router.post('/edit/:id', function(req, res, next) {
	var id = req.params.id;
	var nome = req.body.nome;
	var idade = parseInt(req.body.idade);
	global.db.update(id, {nome, idade}, (err, result) => {
		if(err)	{ return console.log(err); }
		res.redirect('/');
	});
});

router.get('/delete/:id', function(req, res, next) {
	var id = req.params.id;
	global.db.deleteOne(id, (err, result) => {
		if(err)	{ return console.log(err); }
		res.redirect('/');
	});
});

module.exports = router;
