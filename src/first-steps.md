# First Steps
But enough with the theory. It's about time we start writing some code!

iced embraces The Elm Architecture as the most natural approach for architecting interactive applications.
Therefore, when using iced, we will be dealing with the four main ideas we introduced in the previous chapter:
__state__, __messages__, __update logic__, and __view logic__.

In the previous chapter, we dissected and studied the classical counter interface. Let's try to
build it in Rust while leveraging The Elm Architecture.

<div align="center">
  <img alt="A classical counter interface" src="resources/counter-interface-annotated.svg">
</div>

## State
Let's start with the __state__—the underlying data of the application.

In Rust, given the ownership and borrowing rules, it is extremely important to think carefully about the data model
of your application.

> I encourage you to always start by pondering about the data of your application and
  its different states—not only those that are possible, but also those that must be impossible. Then try to leverage
  the type system as much as you can to _[Make Impossible States Impossible]_.

For our counter interface, all we need is a counter value. Since we have both increment and decrement interactions,
the number could potentially be negative. This means we need a signed integer.

Also, we know some users are crazy and they may want to count a lot of things. Let's give them 64 bits to play with:

```rust
struct Counter {
    value: i64,
}
```

> Note: If a crazy user counted 1000 things every second, it would take them ~300 million years to run out of numbers.
> Let's hope that's enough.

[Make Impossible States Impossible]: https://www.youtube.com/watch?v=IcgmSRJHu_8

## Messages
Next, we need to define our __messages__—the interactions of the application.

Our counter interface has two interactions: __increment__ and __decrement__. Technically, we could use a simple boolean to
encode these interactions: `true` for increment and `false` for decrement, for instance.

But... we can do better in Rust! Interactions are mutually exclusive—when we have an interaction, what we really have is one
value of a possible set of values. It turns out that Rust has the perfect data type for modeling this kind of idea: the _enum_.

Thus, we can define our messages like this:

```rust
enum Message {
    Increment,
    Decrement,
}
```

Simple enough! This also sets us up for the long-term. If we ever wanted to add additional interactions to our application—like a
`Reset` interaction, for instance—we could just introduce additional variants to this type. Enums are very powerful and convenient.

## Update Logic
Now, it's time for our __update logic__—how messages change the state of the application.

Basically, we need to write some logic that given any message can update any state of the application accordingly. The simplest
and most idiomatic way to express this logic in Rust is by defining a method named `update` in our application state.

For our counter interface, we only need to properly increment or decrement the `value` of our `Counter` struct based on the `Message`
we just defined:

```rust
impl Counter {
    fn update(&mut self, message: Message) {
        match message {
            Message::Increment => {
                self.value += 1;
            }
            Message::Decrement => {
                self.value -= 1;
            }
        }
    }
}
```

Great! Now we are ready to process user interactions. For instance, imagine we initialized our counter like this:

```rust
let mut counter = Counter { value: 0 };
```

And let's say we wanted to simulate a user playing with our interface for a bit—pressing the increment button twice
and then the decrement button once. We could easily compute the final state of our counter with our __update logic__:

```rust
counter.update(Message::Increment);
counter.update(Message::Increment);
counter.update(Message::Decrement);
```

This would cause our `Counter` to end up with a `value` of `1`:

```rust
assert_eq!(counter.value, 1);
```

In fact, we have just written a simple test for our application logic:

```rust
#[test]
fn it_counts_properly() {
    let mut counter = Counter { value: 0 };

    counter.update(Message::Increment);
    counter.update(Message::Increment);
    counter.update(Message::Decrement);

    assert_eq!(counter.value, 1);
}
```

Notice how easy this was to write! So far, we are just leveraging very simple Rust concepts. No dependencies in sight!
You may even be wondering... "Where is the GUI code?!"

This is one of the main advantages of The Elm Architecture. As we discovered in the previous chapter, widgets are the
only fundamental idea of an interface that is reusable in nature. All the parts we have defined so far are application-specific
and, therefore, do not need to know about the UI library at all!

The Elm Architecture properly embraces the different nature of each part of a user interface—decoupling __state__,
__messages__, and __update logic__ from __widgets__ and __view logic__.

## View Logic
Finally, the only part left for us to define is our __view logic__—how state dictates the widgets of the application.

Here is where the magic happens! In view logic, we bring together the state of the application and its possible interactions
to produce a visual representation of the user interface that must be displayed to the user.

<div align="center" class="right">
  <img alt="A classical counter interface" src="resources/counter-interface.svg" width="50%">
</div>

As we have already learned, this visual representation is made of widgets—the visibly distinct units of an interface. Most
widgets are not application-specific and they can be abstracted and packaged into reusable libraries. These libraries are
normally called _widget toolkits_, _GUI frameworks_, or simply _GUI libraries_.

And this is where __iced__ comes in—finally! iced is a cross-platform GUI library for Rust. It packages a fair collection of
ready-to-use widgets; buttons and numbers included. Exactly what we need for our counter.

### The Buttons
Our counter interface has two __buttons__. Let's see how we can define them using iced.

In iced, widgets are independent values. The same way you can have an integer in a variable, you can have a widget as well.
These values are normally created using a _helper function_ from the `widget` module.

For our buttons, we can use the `button` helper:

```rust
use iced::widget::button;

let increment = button("+");
let decrement = button("-");
```

That's quite simple, isn't it? For now, we have just defined a couple of variables for our buttons.

As we can see, widget helpers may take arguments for configuring parts of the widgets to our liking.
In this case, the `button` function takes a single argument used to describe the contents of the button.


### The Number
We have our buttons sitting nicely in our `increment` and `decrement` variables. How about we do the same
for our counter value?

While iced does not really have a `number` widget, it does have a more generic `text` widget that can be used
to display any kind of text—numbers included:

```rust
use iced::widget::text;

let counter = text(15);
```

Sweet! Like `button`, `text` also takes an argument used to describe its contents. Since we are just getting started, let's
simply hardcode `15` for now.

### The Layout
Alright! We have our two buttons in `increment` and `decrement`, and our counter value in `counter`. That should be everything, right?

Not so fast! The widgets in our counter interface are displayed in a specific __order__. Given our three widgets, there is a total of
__six__ different ways to order them! However, the order we want is: `increment`, `counter`, and `decrement`.

A very simple way of describing this order is to create a list with our widgets:

```rust
let interface = vec![increment, counter, decrement];
```

But we are still missing something! It's not only the order that is specific, our interface also has a specific visual __layout__.

The widgets are positioned on top of each other, but they could very well be positioned from left to right instead. There is nothing
in our description so far that talks about the __layout__ of our widgets.

In iced, layout is described using... well, more widgets! That's right. Not all widgets produce visual results directly; some may simply
manage the position of existing widgets. And since widgets are just values, they can be nested and composed nicely!

The kind of vertical layout that we need for our counter can be achieved with the `column` widget:

```rust
use iced::widget::column;

let interface = column![increment, counter, decrement];
```

This is very similar to our previous snippet! iced provides a `column!` macro for creating a `column` out of some widgets in a particular
__order__—analogous to `vec!`.

### The Interactions
At this point, we have in our `interface` variable a `column` representing our counter interface. But if we actually tried to run it,
we would quickly find out that something is wrong.

Our buttons would be completely disabled. Of course! We have not defined any __interactions__ for them. Notice that we have yet
to use our `Message` enum in our view logic. How is our user interface supposed to produce __messages__ if we don't specify
them? Let's do that now.

In iced, every widget has a specific type that enables further configuration using simple builder methods. The `button`
helper returns an instance of [the `Button` type], which has an `on_press` method we can use to define the message it must
__produce__ when a user presses the button:

```rust
use iced::widget::button;

let increment = button("+").on_press(Message::Increment);
let decrement = button("-").on_press(Message::Decrement);
```

Awesome! Our interactions are wired up! But there is still a small detail left. A button can be pressed multiple times. Therefore,
the same button may need to produce multiple instances of the same `Message`. As a result, we need our `Message` type to be cloneable.

We can easily _derive_ the `Clone` trait—as well as `Debug` and `Copy` for good measure:

```rust
#[derive(Debug, Clone, Copy)]
enum Message {
    Increment,
    Decrement,
}
```

In The Elm Architecture, messages represent __events__ that have occurred—made of pure data. As a consequence, it should always be easy
to derive `Debug` and `Clone` for our `Message` type.


[the `Button` type]: https://docs.iced.rs/iced/widget/struct.Button.html

### The View
We are almost there! There is only one thing left to do: connecting our application __state__ to the view logic.

Let's bring together all the view logic we have written so far:

```rust
use iced::widget::{button, column, text};

// The buttons
let increment = button("+").on_press(Message::Increment);
let decrement = button("-").on_press(Message::Decrement);

// The number
let counter = text(15);

// The layout
let interface = column![increment, counter, decrement];
```

If we ran this view logic, we would now be able to press the buttons. However, nothing would happen as a result. The
counter would be stuck—always showing the number `15`. Our interface is completely stateless!

Of course, the issue here is that our `counter` variable contains a text widget with a hardcoded `15`. Instead, what
we want is to actually display the `value` field of our `Counter` state. This way, when a button is pressed and
our update logic is triggered, the text widget will display the new `value`.

We can easily do this by running our view logic in a method of our `Counter`—just like we did with our update logic:

```rust
use iced::widget::{button, column, text};

impl Counter {
    fn view(&self) {
        // The buttons
        let increment = button("+").on_press(Message::Increment);
        let decrement = button("-").on_press(Message::Decrement);

        // The number
        let counter = text(self.value);

        // The layout
        let interface = column![increment, counter, decrement];
    }
}
```

Our `counter` variable now will always have a `text` widget with the current `value` of our `Counter`. Great!

However, and as you may have noticed, this `view` method is completely useless—it constructs an
`interface`, but then... It does nothing with it and throws it away!

> In iced, constructing and configuring widgets has no side effects. There is no "global context" you need to
  worry about in your view code.

Instead of throwing the `interface` away, we need to return it. Remember, the purpose of our __view logic__ is
to dictate the widgets of our user interface; and the content of the `interface` variable is precisely the
description of the interface we want:

```rust
use iced::widget::{button, column, text, Column};

impl Counter {
    fn view(&self) -> Column<Message> {
        // The buttons
        let increment = button("+").on_press(Message::Increment);
        let decrement = button("-").on_press(Message::Decrement);

        // The number
        let counter = text(self.value);

        // The layout
        let interface = column![increment, counter, decrement];

        interface
    }
}
```

Tada! Notice how the `view` method needs a return type now. The returned type is `Column` because the `column!` macro produces
a widget of this type—just like `button` produces a widget of the `Button` type.

You may also have noticed that this `Column` type has a generic type parameter. This type parameter simply specifies the type
of messages the widget may produce. In this case, it takes our `Message` because the `increment` and `decrement` buttons inside
the column produce messages of this type.

And well... That's it! Our view logic is done! But wait... It's a bit verbose right now. Since it's such a simple interface,
let's just inline everything:

<div align="center" class="right">
  <img alt="A classical counter interface" src="resources/counter-interface.svg" width="50%">
</div>

```rust
use iced::widget::{button, column, text, Column};

impl Counter {
    fn view(&self) -> Column<Message> {
        column![
            button("+").on_press(Message::Increment),
            text(self.value),
            button("-").on_press(Message::Decrement),
        ]
    }
}
```

That's much more concise! And believe it or not... We have just finished writing our counter interface! All that we have left to do
now is to __run__ it.