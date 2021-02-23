# online-coffee
- this repo will have a simple coffee reservation system ,we depend on a free source for admin layout ,[AdminLTE.io]
- let's build online reservation for a takeway coffee shop
- this project for learning purpose only ,its too simple

Workflow :
----------
- user able to register an account [name ,phone & password] [done]
- user able to login by phone & password [done]
- user enter a web page after login [done]
- user fill a form [arival date & time , number of cups he need {cup size & flavor}] [done]
- after admin action user notified with admin action [approved or rejected] [done]

Admin Dashboard :
---------------
- manage sizes & flavors [done]
- ability to approve , block or delete a user & view him reservations [paging here] [done]
- manage reservations : reservation approval & rejection [paging here] [done]
- notification for comming reservations [done]

Technologies Used :
-----------------
- Server Side :
-   Node JS [Express JS]
-   MySQL DB
-   EJS engine
-   Sequelize
-   socket.io
-   Redis for sessions

Client Side :
----------
- HTML & CSS
- Bootstrap
- socket.io client
