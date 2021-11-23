# Node/Express RESTful API
This API was created just for fun and for testing nodejs with express. 
The API includes authentication with bearer token and refresh-token.

API has a api request limit per user (ip-based) as measures to avoid DDOS-attack or brute-force attempts.
The limit is set to 100 requests within 15 minutes.

Upcooming security feature is to blocking users from doing login within the next 30 minutes, if they exceed the maximum login attempts.
 

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


### TODOS
To finished the project theres some todos that has to be done.

1. Blocking users from doing login within the next 30 minutes, if they exceed the maximum login attempts.
2. Implement is email confirmed feature when signing up.
3. Implement forgot password feature.
4. Make sure the serve, build and start commands works as expected.
5. Implement depandabot to make it easier to update packages.

When the listed todos is done, I consider my self as done with this hobby/demo project.
