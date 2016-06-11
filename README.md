## autotask

#### Description: 
Generic tasks builder/handler bound to event handlers and logic hooks takings settings from a set of defined Rules. (via MongoDb) 

#### Dependencies: 
Inspired from defer.js
* node.js
* chai(tests)
* Mongoose
* MongoDb

#### The Plan:
Build a generic block-building event driven logic of promise-deferred that are handled by logic hook taking config from a set of most custumizable possibble rules via MongoDb.
In the end, this will serve has a bot constructor using recursive deferred-promise logic triggered througth pre-exposed event logic(themselves optionaly using recursive logic)
The bot can only call method/function from other exports/modules. 
Errors will be handled with a errBack logic that must be exposed(or defaulted to err traceback). 
The final run function for the bots will requires all invoked parameters or invoke the failedParams error.
The bot will optionally support a token/permissions system of exposed authentification rules
Finally i will strugle to make it as simple and generic humanly possible. Any ideas or contributions is welcomed!

##### Main logic:
lexicon:
* Configuration
* Tasks/options
* Rules
* Routines and sub-routines
* Goals and Oracles
* Meta-task vs Sub tasks
* Logic hook builder
* Callback 
* Fallback
* ErrBack
* Deferred list vs Deferred cascades
* Promises-like logic via Logic Hooks and Rules
* Pipelines
* Event and triggers

###### Bot Configuration:

* Authorized oracles sources
* Oracles routines/subroutines pipeline object
* Entering parameters object
* Requires list
* Authorizations routines/subroutines pipeline objects
* Global rules (act as constant middleware)
* Routines/subroutine rules
* Routines/subroutine invokation types (requires, json-rpc or api endpoints)
* Exposed and bound events/listeners and associated Oracles index
* Exposed and bound to routines/subroutine goal parameters with _SUCCESS, _PARTIAL, _FAILED, _REFUSED, _TRYOUT status and invoked callback/fallback/errback
* Optional _GLOBALS  object

###### Tasks/options:
Each tasks are defined in groups:

* Meta task
* Sub-task

They are bound to multiple option/parameters:

* Entering parameters
* Event triggers and listeners

Events are bound to:

* success/fail parameters set( can be a deferred list/cascade of conditional parmeters to be met in a certain order)
* Set of callback, Fallback, Errback logic called sub-routine
* A set of authorized oracles sources to listen to. 

###### Rules: 
Rules are defined this way:
* Global rules will be asserted each time a logic hook is triggered
* routines subroutines rules will be asserted to fetch current task status each time a routine/subroutine related event is triggered

###### Routines/subroutine: 
Routines/subroutine are objects consisting of a deferred list/cascade of task invokation (either via lib/require or json-rpc or api end-points) and conditional logic hooks that will assert the current status or the tasks and handle it via recursive callback/fallbackerrback logic. The Routines/subroutine will try to succeed there task up to a optional logic hooks condition and triggers according events. 
Subroutine are a list of routines associated to a routines step, when all subroutines lcal goal parameters are asserted succeded the according statu and return value will be returned to the next routines step.
###### Goals and Oracles:
Goals consist of a list of parameters and associated status. status are associated with the callback,fallback,errback strategy in the routines/subroutines.
Oracles consist of a list or external source of data that are bound to event and listener that will alert associated routines/subroutines.

###### Meta-task vs Sub tasks
Meta-tasks and Sub tasks are a optional layer of abstraction for method invokation using a internal json-rpc call to bind methods/modules to specific preset task and subtasks

###### Logic hook builder
Logic hooks constist of logical assertions associated to rules and/or goals parameters that will return a status event and/or a action(callback,fallback,errback)
This is a middleware logic that handle and route actions/status.
This is where the recursive logic is built, the logic hook will be able to call its inner routine associated tasks recursively and dynamically depending on last logical assertion and iterator current return value/status

###### Callbacks, Fallbacks, Errbacks logic:
These are methods that are exposed to the constructor objects and that will be invoked by a process. Each methods is built in a object iterator that will analyse the current retrun value/status and handle next method accordingly.
Fallback and errback serves as conditional that can invoke any tasks sets (and this recursively so is important to avoid infinite loops with well-built parameters)
Each process (Routine subroutine iterations, authorization, oracles, globals rules, local routine parameters) is associated with a callback,fallback,errback strategy 
Most process wil come with a default but some migth not and will trigger a failed startegy error if local entering parameters are not met.
Oracles, rules and goal parameters will deal with external sources.

###### Deferred list vs Deferred cascades
Deferred is a async queu handling logic that will iterate over a set of tasks(methods.function ect..) either in list (paralel) or in cascade(one after the other). 
The two can be inter-mixed (parallel process that launch cascade set of methods for example)

###### Promises-like logic via Logic Hooks and Rules
This specific deferred logic will also be bound to a promise-like logic that will assert against goal parameters and rules and return according status and return value to the next process(or processes)

###### Strategies:
Strategies are a set of objects containing callback, fallback and errback.
Each strategy is indexed in a namespace and invoked by the routines/subroutines depending on status/return value 

###### Pipelines: 
The way to built the bot is to setup its pipelines.
Each pipelines are defined as a set of routines/subroutines their asscociated rules,events,strategies and oracles.
Pipeline is an object that can be triggered by any events and/or callback,fallback,errback strategy.

Pipelines contains routines linked to its own strategies that will resolve following the deferred list or cascade logic until local goal parameters are met and then return final status/return value. If the routines taks cannot be resolved there is a tryout event that can fire another pipeline and/or strategy and/or events,
So, each task and sub task are built in with succeding , partial succeeding, failed, refused or tryout status and according strategy and wil can call themselves until task/subtask is asserting to the needed status return value. 
Its mostly like building a story in which action/reaction are associated with a goal and each step is asscoaietd with logic hooks that handle the next action/reaction.
Oracles logic permit it to get status and data from any possible trusted source (even machine learning) and link your bot to smart perception or digital reality.

###### Event and triggers
Events are defined with their listener in unique namespaces. They are exposed and bound to task and subtask. 
By default you have to define an event for each basic status or expected return value assertions and associated strategies
You can create custom status or return value assertion (called promise here for clarity)
Promise can be linked to either return value passed thourgth the assertion and/or the oracles return valu and/or status. 
If not defined any tasks will use default status strategies. 

###### Nota: This is a testgroung repo and will eb migrated to a cean module when goal is reached.
