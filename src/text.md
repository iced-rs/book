# Text
Text is likely the most essential widget of a graphical user interface.

There are multiple ways to display text in iced, but the most common approach is to use the [`text`] helper of the [`widget`] module to build an instance of [the `Text` widget].

[`text`]: https://docs.rs/iced/latest/iced/widget/fn.text.html
[`widget`]: https://docs.rs/iced/latest/iced/widget/index.html
[the `Text` widget]: https://docs.rs/iced/latest/iced/widget/type.Text.html

```rust,ignore,iced,static
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
use iced::widget::text;
use iced::{Fill, Font};

text("- Hello there!\n- General Kenobi!")
    .font(Font::MONOSPACE)
    .size(30) // in logical pixels
    .line_height(1.5) // relative to the size (=45px)
    .width(Fill)
    .height(Fill)
    .center()
# }
```

## Alignment
A `Text` widget aligns its contents inside of its own bounds.

Since, by default, the `Text` widget uses an intrinsic sizing strategy, its bounds will match the content dimensions. Effectively, this means that trying to align text without altering the default sizing strategy will result in a no-op.

```rust,ignore,iced,static,height=40
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
text("This text will not be centered").center()
# }
```

If we explicitly set the `width` to `Fill`, we will get the horizontal alignment we expect:

```rust,ignore,iced,static,height=40
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
use iced::Fill;

text("This text will be centered horizontally")
    .width(Fill)
    .center()
# }
```

If we do the same for the `height`, we will then align in both axes:

```rust,ignore,iced,static,height=40
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
use iced::Fill;

text("This text will be centered")
    .width(Fill)
    .height(Fill)
    .center()
# }
```

Of course, we can also align inside fixed dimensions:
```rust,ignore,iced,static
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
text("This text will be centered inside a 150x150 square")
    .width(150)
    .height(150)
    .center()
# }
```

## Styling
The different methods of the `Text` widget can be used to change its appearance—from the `font` used and its size to the `color` of the text.

The `style` method, however, lets you leverage the current `Theme` of the application to choose the color of the text:

```rust,ignore,iced,static,height=30
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
use iced::Theme;

text("This is the primary color of the current theme!")
    .style(|theme: &Theme| text::Style {
        color: Some(theme.palette().primary),
    })
# }
```

For your convenience, the `widget::text` module has some built-in helpers you can directly provide to `style`:

```rust,ignore,iced,static,height=30
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
text("And this is the warning color!")
    .style(text::warning)
# }
```

All of the built-in widgets follow this pattern. Keep it in mind!

## The `text!` macro
Often, you will find yourself using `format!` to combine a dynamic value with some static text. For instance:

```rust,ignore,iced,static,height=30
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
let name = "Héctor"; // Let's assume this is dynamic

text(format!("Hello, {name}!"))
# }
```

The `text!` macro streamlines this use case. It behaves exactly the same as `format!`, but it just returns a `Text` widget instead of a `String`.

```rust,ignore,iced,static,height=30
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
let name = "Héctor"; // Let's assume this is dynamic

text!("Hello, {name}!")
# }
```

If you import `iced::widget::text`, you do not need to import the macro separately. Rust will bring you the `text` function helper, the `text` module, and the `text!` macro—all in a single import.

Quite nifty! 

## String Slices
The `Text` widget provides a `From<&str>` implementation for [`Element`].

Since most function helpers for building widgets take an `Into<Element>`, this implementation allows you to skip calling `text()` completely if you have a string slice.

[`Element`]: https://docs.rs/iced/latest/iced/type.Element.html

```rust,ignore,iced,static,height=30
# use iced::widget::Container;
# use iced::Never;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Container<'_, Never> {
use iced::widget::container;

// We could just return:
// container(text("Redundant"))
//
// But the following is equivalent:
container("Short and nice!")
# }
```

This will only work if you want to use the default text appearance. If you need to customize it, you will have to use the `text` helper.
