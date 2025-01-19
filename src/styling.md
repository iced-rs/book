# Styling
After learning about layout and how to arrange widgets on the screen, let's explore how we can make our interfaces look more appealing and match our desired visual design.

Like with layout, iced takes a modular approach to styling - each widget implements its own styling strategy rather than having a unified system. However, all built-in widgets follow consistent styling patterns that we'll explore in this chapter.

## Basic Styling
The most straightforward way to style a widget in iced is by using its `.style()` method. Let's look at a simple example:

```rust,ignore,iced(height=100px)
# use iced::{
#     widget::container,
#     Element,
# };
#
# #[derive(Default)]
# struct Example;
# #[derive(Debug, Clone, Copy)]
# enum Message {}
#
# impl Example {
#     fn update(&mut self, _message: Message) {
#         // No state changes
#     }
#
fn view(&self) -> Element<Message> {
    container("I am a rounded box!")
        .style(container::rounded_box)
        .into()
}
# }
#
# pub fn main() -> iced::Result {
#     iced::run("Styling example", Example::update, Example::view)
# }
```

Here we're using the built-in `rounded_box` style provided by the `container` module. Most widgets provide these pre-made styles for common use cases.

## Theme-Aware Styling 
While using pre-made styles is convenient, you often want to create custom styles that adapt to the current theme of your application. The `.style()` method accepts a closure that receives the current [`Theme`] and returns the appropriate style:

```rust,ignore,iced(height=100px)
# use iced::{
#     widget::button,
#     Element,
#     Theme,
# };
#
# #[derive(Default)]
# struct Example;
#
# #[derive(Debug, Clone, Copy)]
# enum Message {
#     ButtonPressed,
# }
#
# impl Example {
#     fn update(&mut self, _message: Message) {
#         // No state changes
#     }
#
fn view(&self) -> Element<Message> {
    button("I am a styled button!")
#       .on_press(Message::ButtonPressed)
        .style(|theme: &Theme, _status| {
            let palette = theme.extended_palette();
            
            button::Style::default()
                .with_background(palette.primary.base.color)
        })
        .into()
}
# }
#
# pub fn main() -> iced::Result {
#     iced::run("Theme styling example", Example::update, Example::view)
# }
```

The [`Theme`] provides access to color palettes through two methods:
- `.palette()` - Basic color palette with primary colors
- `.extended_palette()` - Extended palette with additional color variations

## State-Based Styling
Many widgets can exist in different states - a button can be pressed, hovered, or disabled for example. When styling these widgets, the closure also receives a `Status` parameter allowing you to define different styles for each state:

```rust,ignore,iced(height=100px)
# use iced::{
#     widget::button,
#     Element,
#     Theme,
# };
#
# #[derive(Default)]
# struct Example;
#
# #[derive(Debug, Clone, Copy)]
# enum Message {
#     ButtonPressed,
# }
#
# impl Example {
#     fn update(&mut self, _message: Message) {
#         // No state changes
#     }
#
fn view(&self) -> Element<Message> {
    button("I am a state-aware button!")
#       .on_press(Message::ButtonPressed)
        .style(|theme: &Theme, status| {
            let palette = theme.extended_palette();

            match status {
                button::Status::Active => {
                    button::Style::default()
                        .with_background(palette.success.strong.color)
                }
                button::Status::Hovered => {
                    button::Style::default()
                        .with_background(palette.success.base.color)
                }
                _ => button::primary(theme, status),
            }
        })
        .into()
}
# }
#
# pub fn main() -> iced::Result {
#     iced::run("State-based styling example", Example::update, Example::view)
# }
```
Also, you can return different styles based on app's state:
```rust,ignore,iced(height=100px)
# use iced::{
#     widget::button,
#     Element,
#     Theme,
# };
#
#[derive(Default)]
struct Example {
    is_feature_enabled: bool,
}

#[derive(Debug, Clone, Copy)]
enum Message {
    ButtonPressed,
}

impl Example {
    fn update(&mut self, message: Message) {
#    #[allow(irrefutable_let_patterns)]
        if let Message::ButtonPressed = message {
            self.is_feature_enabled = !self.is_feature_enabled;
        }
    }

    fn view(&self) -> Element<Message> {
        button("I am an app's state-aware button! Click me to toggle the color.")
            .on_press(Message::ButtonPressed)
            .style(|theme: &Theme, _status| {
                let palette = theme.extended_palette();

                if self.is_feature_enabled {
                    button::Style::default()
                        .with_background(palette.success.strong.color)
                } else {
                    button::Style::default()
                        .with_background(palette.success.base.color)
                }
            })
            .into()
    }
}
#
# pub fn main() -> iced::Result {
#     iced::run("App's state-based styling example", Example::update, Example::view)
# }
```


## Built-in Styles
Most widget modules provide convenient styling functions that you can use directly, for example:

- [`container::rounded_box`] - Creates a container with rounded corners
- [`button::primary`] - Primary button style using theme colors
- [`text::danger`] - Red text style for error messages

Here's how you might use these built-in styles:

```rust,ignore,iced(height=100px)
# use iced::{
#     widget::{button, container},
#     Element,
# };
#
# #[derive(Default)]
# struct Example;
#
# #[derive(Debug, Clone, Copy)]
# enum Message {
#     ButtonPressed,
# }
#
# impl Example {
#     fn update(&mut self, _message: Message) {
#         // No state changes
#     }
#
fn view(&self) -> Element<Message> {
    container(
        button("Click me!")
#           .on_press(Message::ButtonPressed)
            .style(button::primary)
    )
    .style(container::rounded_box)
    .into()
}
# }
#
# pub fn main() -> iced::Result {
#     iced::run("Built-in styles example", Example::update, Example::view)
# }
```

> The styling system in iced is intentionally flexible. Rather than enforcing a single approach,
> it provides the building blocks needed to create consistent styles across your application
> while still allowing for customization when needed.

[`Theme`]: https://docs.rs/iced/latest/iced/enum.Theme.html
[`button::primary`]: https://docs.rs/iced/latest/iced/widget/button/fn.primary.html
[`container::rounded_box`]: https://docs.rs/iced/latest/iced/widget/container/fn.rounded_box.html
[`text::danger`]: https://docs.rs/iced/latest/iced/widget/text/fn.danger.html

> #### Note From the Author
> You reached the end of the book, for now!
>
> I think it should already serve as a quick introduction to the basics of the library.
> There is a lot more to unravel—but hopefully you are now at a point where you can start
> playing around, having fun, and experimenting further.
>
> The book is far from finished—there are a lot more topics I want to cover here, namely:
>
>   - Concurrency
>   - Scaling Applications
>   - Extending the Runtime
>   - And More!
>
> Until I get to write them, check out the [Additional Resources](additional-resources.md)
> chapter if you want to explore and learn further.
>
> I hope that you enjoyed the read so far. Stay tuned!
>
> — Héctor
