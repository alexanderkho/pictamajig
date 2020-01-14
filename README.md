# About picta-majig
picta-majig is a photo-sharing service that allows users to upload and search images. Think "instagram-lite" :)

This is a "minimum-viable-product" project that I completed in one day during my time as a student at Hack Reactor @ Galvanize in Boulder, CO. There are numerous missing features (user-login & authentication, capability to flag and delete images, etc.) that I'd like to add in the future.

The front-end was built with Create React App and Bootstrap, and the backend/API was built with Node, Express and MongoDB.

This application was deployed to an AWS EC2 and can be viewed [here](http://ec2-3-134-76-250.us-east-2.compute.amazonaws.com:8080/).

Alternatively the application can be run locally via the following commands:
```
npm install
npm run build
npm start
```
This will launch the server on localhost:8080. Note that you will need MongoDB installed on your machine, and you may need to edit the DB connection paramaters in 'db/index.js' with your local username/password. 
