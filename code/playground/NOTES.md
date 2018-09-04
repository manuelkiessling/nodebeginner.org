# General


## Authentication

* REST requests must include the `X-Requested-With: XMLHttpRequest` header
* Client-side app receives session token after successful auth via REST response
* REST response also stores the token in a cookie
* Non-universal app: The client-side app can request `GET /api/sessiontokens/current`; the request will contain the
  cookie and the `X-Requested-With: XMLHttpRequest` header, thus the backend can respond with the token in the response
  body; this is secure against CSRF (see https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#Protecting_REST_Services:_Use_of_Custom_Request_Headers)
* Universal app: upon full-page requests, the session token is transmitted to the backend via cookie, thus it's
  straightforward to include it in the inital app state


# Component hierarchy

## App

* REST: GET /api/sessiontokens/


### TopNavigation

### Screen "Home"

* Route: /
* Links to: Screen **Login**


### Screen "Login"

#### LoginContainer
##### LoginForm

* Route: /login-form
* REST: POST /api/sessiontokens/
* Redirects to: Screen **Tasks**


### Screen "Tasks"

* Route: /tasks/

#### AddTasksContainer

##### AddTasksForm

* Route: /tasks/add-form
* REST: POST /api/tasks/

#### TaskListsContainer
##### TaskList
###### TaskListItem

* Links to: /tasks/:id

####### TaskListItemDetails

####### RemoveTaskElement
######## RemoveTaskModal
