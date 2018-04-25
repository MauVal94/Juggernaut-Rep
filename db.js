var mongoose = require('mongoose');

mongoose.useMongoClient
mongoose.connect('mongodb://admin:admin@juggernaut-cluster-shard-00-00-pam8k.mongodb.net:27017,juggernaut-cluster-shard-00-01-pam8k.mongodb.net:27017,juggernaut-cluster-shard-00-02-pam8k.mongodb.net:27017/nuber?ssl=true&replicaSet=Juggernaut-Cluster-shard-0&authSource=admin')
    .then(function (data){
    console.log(data);
}).catch(function (error) {
    console.log("Mongodb connection failed. Error is: " + error)
});

