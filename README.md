# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application, adding the ability to create users, create/delete items, manage likes per item, all this dynamically via a connected database.

What techniques are in use right now:

-Express
\Routing: incoming requests are diverted to properly nested routing protocols.
\Controllers: once requests are properly routed they are treated with appropriate functionality to collect request parameters/data, modify the database in question, abd send a server response, including error handling.

-Postman
Most(all) server testing is done using postman to test the server in the various ways, putting the above to use. Invaluable for seeing what responses the application gives in situation x, y, z, etc.

-MongoDb
All the data for this project interfaces with databases generated and modified by MongoDb including the generation/application of models/schemas.

//NEW//

-JSON Web Token verification and authorization

-Multiple users with different identification and authorization

-Items/cards/photos having owners with certain rights

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

//THE WORLD WIDE WEB//

This project, including both the backend/node stuff and the frontend/react stuff, now all runs continuously on a remote server via google cloud services using an ubuntu virtual machine. PM2, as a process, serves the backend requests while nginx redirects traffic from the default ports of the VM to the ports configured for my front end and serves the html back to the client. The traffic is secured using Certbot for certification, utilizing https and environmental variables to help secure data.

The address for users is going to be either

tastywearlab.jumpingcrab.com

or

www.tastywearlab.jumpingcrab.com.

(API requests go to api.tastywearlab.com).

PROJECT PITCH
https://drive.google.com/file/d/1F1DFTAhNMjE3Ksc39zKt6vF4TXtOC7b3/view?usp=sharing

PROJECT DEMO
https://drive.google.com/file/d/11ZvQUr2C5KGCI294GeCzTwL_mNT-QRmd/view?usp=sharing

Cheers!
