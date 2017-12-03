var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// Base na nuvem
//mongoClient.connect('mongodb://vargola:s2u0r1f0@cluster0-shard-00-00-sjadk.mongodb.net:27017,cluster0-shard-00-01-sjadk.mongodb.net:27017,cluster0-shard-00-02-sjadk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
//	function(err, conn) {
//		if(err) return console.log(err);
//		global.conn = conn;
//	});

// Base local
MongoClient.connect('mongodb://localhost/workshoptdc')
	.then(conn => global.conn = conn)
	.catch(err => console.log(err))

function findAll(callback) {
	global.conn.collection('customers').find().toArray(callback);
}

function insert(customer, callback) {
	global.conn.collection('customers').insert(customer, callback);
}

function findOne(id, callback) {
	global.conn.collection('customers').find(new ObjectId(id)).toArray(callback);
}

function update(id, customer, callback) {
	global.conn.collection('customers').updateOne({_id: new ObjectId(id)}, customer, callback);
}

function deleteOne(id, callback) {
	global.conn.collection('customers').deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne }
