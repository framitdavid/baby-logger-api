TODOS: 
* Use ServerResponse within all Services so the Controllers uses the ControllerUtils.   
  response method to know what to send back to the client. - Continue with this one!!

* Create helpers/utils with validation methods to validate incomming requests.

* Type .env file and use the .env settings whithin the code


* Read the code and check if there are something that could be refactored..?
  Should we create a SecurityUtils witch has the methods for hash the password etc?

# Simple Node/Express RESTful API

Information about the project and the API comes here!

## API Endpoints

### Authentication endpoints
[POST] api/v1/authenticate/signup \
[POST] api/v1/authenticate \
[POST] api/v1/authenticate/token \
[POST] api/v1/authenticate/logout 

### Breastfeeding endpoints
[GET] api/v1/breastfeeding \
[POST] api/v1/breastfeeding \
[PATCH] api/v1/breastfeeding \
[DELETE] api/v1/breastfeeding/:id

### Diaper change endpoints
[GET] api/v1/diaperChange \
[POST] api/v1/diaperChange \
[PATCH] api/v1/diaperChange \
[DELETE] api/v1/diaperChange/:id