# Juggernaut-Rep


mongodb://username:password@juggernaut-cluster-shard-00-00-pam8k.mongodb.net:27017,juggernaut-cluster-shard-00-01-pam8k.mongodb.net:27017,juggernaut-cluster-shard-00-02-pam8k.mongodb.net:27017/test?ssl=true&replicaSet=Juggernaut-Cluster-shard-0&authSource=admin


Google Maps API key:
AIzaSyCUzmUT7tJTRJtZ5KpL4Y4Mr6DmaPhSt6A

Delete and add drivers:
DELETE: http://localhost:3000/drivers/id
POST: http://localhost:3000/drivers/id
 As Driver set from available to unavailable:
PUT: http://localhost:3000/drivers/id change available to true or false
As a user see eta of driver 
GET: http://localhost:3000/google/distance?userID=id&driverID=id
As a user edit personal information
PUT: http://localhost:3000/users/id change information in body.
See ratings
user
GET: http://localhost:3000/users/id
Driver
GET: http://localhost:3000/drivers/id
Cancel rides 
PUT: http://localhost:3000/users/id change available to false
As a user see drivers within a configurable distance 
GET: http://localhost:3000/test/proximity?userID=id&proximity= distance in km
