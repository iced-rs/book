# Text
Text is likely the most essential widget of a graphical user interface.

There are multiple ways to display text in iced, but the most common approach is to use the [`text`] helper of the [`widget`] module to build an instance of [the `Text` widget].

[`text`]: https://docs.rs/iced/latest/iced/widget/fn.text.html
[`widget`]: https://docs.rs/iced/latest/iced/widget/index.html
[the `Text` widget]: https://docs.rs/iced/latest/iced/widget/type.Text.html

```rust,iced,static
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
    .line_height(1.5) // relative to the size (=15px)
    .width(Fill)
    .height(Fill)
    .center()
# }
```

## Alignment
A `Text` widget aligns its contents inside of its own bounds.

Since, by default, the `Text` widget uses an intrinsic sizing strategy, its bounds will match the content dimensions. Effectively, this means that trying to align text without altering the default sizing strategy will result in a no-op.

```rust,iced,static,height=40
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

```rust,iced,static,height=40
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

```rust,iced,static,height=40
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
```rust,iced,static
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

```rust,iced,static,height=30
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

```rust,iced,static,height=30
# use iced::widget::Text;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Text<'_> {
# use iced::widget::text;
use iced::Theme;

text("And this is the warning color!")
    .style(text::warning)
# }
```

All of the built-in widgets follow this pattern. Keep it in mind!

## The `text!` macro
Often, you will find yourself using `format!` to combine a dynamic value with some static text. For instance:

```rust,iced,static,height=30
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

```rust,iced,static,height=30
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
