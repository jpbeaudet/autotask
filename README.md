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
Eventually i would add neural net machine learning to prioritize best performing routines sets conditionaaly to oracles data which would enable to learn to be better.
Also it could bind machine learning result as oracles from the main pipelines to each routine and task saparatly, making it a very smart bot !

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

#### Structures:
>> root
>> autotask/
* run.js (auto task router; will trigger bot setup; can launch multiple bot at the same time; bot(s) can listen to events and start/stop accordingly)
* config.js (main global configs)
* setup.js (bot configurations and autotask constructor invokation; is asserted by global rules; is invoked and passed configuration and rules paths/ids via run.js)
* package.json
* license (gpl 3.0)

>> autotask/src/
* autotask.js (main bot object constructor; contain pipelines associated with their global strategy/events and goals parameters; act like a router)
* do.js ( handle tasks invokation)
* bots/<botname>/<botname>.js (actual configured instance of autotask.js for a single bot)
* bots/<botname>/map.js (index to handle path resolution and env/globals variables; invoked by autotask.js)
* defer/defer.js ( handle deferred contructors and iterators)
* defer/promised.js ( handle rules and goal parameters assertions from strategies)
* pipelines/<pipeline name> (custom pipeline; set of routine and/or subroutines)
* pipelines/pipelines.js (handle pipelines global goal resolution with goal.js, defer.js and promise/rules logic)
* pipelines/error.js (handle errors)
* routines/routines.js (routines/subroutines constructor)
* routines/goals.js (goal parameters and trategies constructor)
* routines/will.js ( handle goal parameters resolution with strategy and handle goal status and tryout limit; will act as a local router for the current routine global goal and hten to next process.)
* routines/rules.js ( middleware constructor associated to a unique namespace taken from connectors[default mongoDb])
* routines/confirm.js ( handle confirmations delay and assertions for events and/or strategy resolution)
* routines/error.js (handle errors)
* strategies/strategies.js ( strategies constructor)
* strategies/strategymaster.js ( handle strategy resolution with promises and defers; called each time a strategy is invoked.)
* strategies/error.js (handle errors)
* tasks/tasks.js( task constructor)
* tasks/taskmaster.js ( handle task resolution with strategies)
* tasks/error.js (handle errors)
* events/events.js ( handle exposed events and trigger according strategy)
* models/<mongoose shema> (handle needed monDb collection shema for testing)
* oracles/<pipeline name> (setup the oracles pipelines and routines and bind event/strategies)
* connectors/rpc.js
* connectors/api.js
* connectors/tcp.js
* connectors/ws.js
* connectors/mongoDb.js
* connectors/request.js
* connectors/poll.js ( handle the polling of multiple oracles sources with attributed weigth and return according status/return value)
* connectors/quorum.js (config object for poll weigth each polling pool beeing attributed a namespace)
* connectors/resolve.js (will handle strategy assertion[promises/rules] from connectors and return status and return value to adpater.js)
* connectors/adapter.js ( handle connector data result and traduct it in proper task invokation)
* auths/<pipeline name> (setup the authenfification pipelines and routines and bind event/strategies)



###### Nota: This is a testground repo and will be migrated to a cleaner module when goal is reached.
