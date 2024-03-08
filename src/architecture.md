# Architecture
Let's start from the basics! You are probably very familiar with graphical user interfaces already.
You can find them on your phone, computer, and most interactive electronic devices. In fact, you are
most likely reading this book using one!

At their essence, graphical user interfaces are applications that __display__ some information graphically
to a user. This user can then choose to __interact__ with the application—normally using some kind of device;
like a keyboard, mouse, or touchscreen.

<div align="center">
  <img alt="Interface displays, user interacts" src="resources/gui-displays-user-interacts.svg">
</div>

The user interactions may cause the application to update and display new information as a result, which in turn
may cause further user interactions, which in turn cause further updates... And so on. This quick feedback loop
is what causes the feeling of _interactivity_.

> Note: In this book, we will refer to graphical user interfaces as __GUIs__, __UIs__, __user interfaces__, or simply
  __interfaces__. Technically, not all interfaces are graphical nor user-oriented; but, given the context of this
  book, we will use all of these terms interchangeably.

## Dissecting an interface
Since we are interested in creating user interfaces, let's take a closer look at them. We will start with a very
simple one: the classical counter interface. What is it made of?

<div align="center">
  <img alt="A classical counter interface" src="resources/counter-interface.svg">
</div>

As we can clearly see, this interface has three visibly distinct elements: two buttons with a number in between.
We refer to these visibly distinct elements of a user interface as __widgets__ or __elements__.

Some __widgets__ may be interactive, like a button. In the counter interface, the buttons can be used to trigger
certain __interactions__. Specifically, the button at the top can be used to increment the counter value, while the
button at the bottom can be used to decrement it.

We can also say that user interfaces are _stateful_—there is some __state__ that persists between interactions.
The counter interface displays a number representing the counter value. The number displayed will change depending on
the amount of times we press the buttons. Pressing the increment button once will result in a different displayed value
compared to pressing it twice.

<div align="center">
  <img alt="A dissected counter interface" src="resources/counter-interface-annotated.svg">
</div>

## The GUI trinity
Our quick dissection has successfully identified three foundational ideas in a user interface:

- __Widgets__ — the distinct visual elements of an interface.
- __Interactions__ — the actions that may be triggered by some widgets.
- __State__ — the underlying condition or information of an interface.

These ideas are connected to each other, forming another feedback loop!

__Widgets__ produce __interactions__ when a user interacts with them. These __interactions__ then change the __state__
of the interface. The changed __state__ propagates and dictates the new __widgets__ that must be displayed. These new
__widgets__ may then produce new __interactions__, which can change the __state__ again... And so on.

<div align="center">
  <img alt="The GUI trinity" src="resources/the-gui-trinity.svg">
</div>
