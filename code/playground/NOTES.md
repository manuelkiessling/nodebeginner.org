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
