# WIP

Development branch for next version, breaking changes.

API incomplete.

Requires adapting stores to new format.

Synopsis: RiotControl provides central event controller/dispatcher. Think of it as a message bus that all stores subscribe to, and views can trigger events on at anytime.

Stores are automatically wrapped into a seperate thread (web worker). Encapsulates stores from direct access, also provides computation off the main UI thread.

Currently messages/events are pass by value (not pass by reference).

