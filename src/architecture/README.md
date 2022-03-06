# Architecture

Every iced application must follow [The Elm Architecture].

This architecture is a simple pattern for building interactive applications.

[The Elm Architecture]: https://guide.elm-lang.org/architecture/


## The Runtime

The Elm Architecture is the core mechanism used to describe your application state, interactions, and presentation.

This mechanism is only a small part of the machinery of your application. It can't run on its own! In order to run your application, iced can take this mechanism and put it to work in its __runtime__.

It is useful to differentiate between

* __The program__ — the core logic of your application. Unique to your application and built using The Elm Architecture.
* __The runtime__ — the external logic running and managing the program. Common to all applications and provided by iced.


## The Core Concepts

Applications made with iced are always split into four different concepts:

* __State__ — the state of your application.
* __Messages__ — user interactions or meaningful events that you care about.
* __View logic__ — a way to display your __state__ as widgets that may produce __messages__ on user interaction.
* __Update logic__ — a way to react to __messages__ and update your __state__.
