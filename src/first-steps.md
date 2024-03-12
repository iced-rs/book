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

## Update logic
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

## View logic
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

### The buttons
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


### The number
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

### The column
Alright! We have our two buttons in `increment` and `decrement`, and our counter value in `counter`. That should be everything, right?

Not so fast! The widgets in our counter interface are displayed in a specific __order__. Given our three widgets, there is a total of
__six__ different ways to order them! However, the order we want is: `increment`, `counter`, and `decrement`.

A very simple way of describing this order is to create a list with our widgets:

```rust
let interface = vec![increment, counter, decrement];
```

But we are still missing something! It's not only the order that is specific, our interface also has a specific __layout__.

The widgets are positioned on top of each other, but they could very well be positioned from left to right instead. There is nothing
in our description so far that talks about the __layout__ of our widgets.

In iced, layout is described using... well, more widgets! That's right. Not all widgets produce visual results directly; some may simply
manage the position of existing widgets. And since widgets are just values, they can be nested together nicely!

The kind of vertical layout that we need for our counter can be achieved with the `column` widget:

```rust
use iced::widget::column;

let interface = column![increment, counter, decrement];
```

This is very similar to our previous snippet! iced provides a `column!` macro for creating a `column` out of some widgets in a particular
__order__—analogous to `vec!`.

### Interactions


```rust
let counter = number(15);
let decrement = button("-");
```

Cool! That seems very readable and simple. However, this does not really describe our interface fully.

We have only defined three variables without actually using them. We need to somehow combine the widgets into a single value that describes their
order in our interface.

Maybe we could use a `Vec`?

```rust
vec![
    button("+"),
    number(15),
    button("-"),
]
```

### The generic `Element`

### Statefulness

```rust
use iced::widget::{button, column, text};
use iced::Element;

impl Counter {
    fn view(&self) -> Element<Message> {
        column![
            button("+").on_press(Message::Increment),
            text(self.value).size(30),
            button("-").on_press(Message::Decrement),
        ].into()
    }
}
```

