# Layout
After learning about the fundamentals of The Elm Architecture and how to run our applications, it's time to explore how we can arrange our widgets visually on the screen.

In iced, layout is handled in a modular way - each widget implements its own layout strategy rather than having a single unified system. This gives us flexibility while keeping things simple and predictable.

## Building Blocks
The most common way to build layouts in iced is by combining three fundamental layout widgets:

- [`row`] - Arrange widgets horizontally from left to right
- [`column`] - Stack widgets vertically from top to bottom  
- [`container`] - Position or align a single widget within their bounds

Let's see how we can use these building blocks together:

```rust,ignore,iced(height=140px)
# use iced::widget::{column, container, row};
# use iced::{Length, Element};
# use iced::alignment::Horizontal;
# use iced::alignment::Vertical;
#
# #[derive(Default)]
# struct Example;
#
# #[derive(Debug, Clone, Copy)]
# enum Message { }
# impl Example {
# fn update(&mut self, _message: Message) {
#     
# }
#
fn view(&self) -> Element<Message> {
    // Create container
    container(
        // Create column
        column![
            "Top",
            // Create row withh spacing "10"
            row![
                "Left",
                // Create column without spacing
                column![
                    "Center Top",
                    "Center Bottom"
                ],
                "Right"
            ].spacing(10),
            "Bottom"
        ]
        // Add spacing "10"
        .spacing(10),
    )
    // Add padding "10"
    .padding(10)
    // Center horizontally
    .center_x(Length::Fill)
    // Center vertically
    .center_y(Length::Fill)
    .into()
}
# }
#
# pub fn main() -> iced::Result {
#     iced::run("Layout example", Example::update, Example::view)
# }
```

Let's break down what's happening in this example:

1. We create a [`column`] that stacks three elements vertically:
   - A "Top" text widget
   - A [`row`] containing "Left" and "Right" text widgets and [`row`] with "Center Top" and "Center Bottom" text widgets
   - A "Bottom" text widget

2. We add spacing between the column's and row's elements using `.spacing(10)`

3. The row also gets horizontal spacing between its elements

4. We wrap everything in a [`container`] that:
   - Adds padding around its contents
   - Centers the content both horizontally and vertically

## Spacing and Padding
Both rows and columns support adding space between their children using the [`.spacing()`] method. This is different from padding:

- __Spacing__ adds space between elements
- __Padding__ adds space around all elements

Containers can add padding around their contents using [`.padding()`]. This creates breathing room between the container's bounds and its child widget.

## Alignment 
Containers are particularly useful for alignment. They can position their contents using methods like:

- [`.center_x()`] - Center horizontally
- [`.center_y()`] - Center vertically 
- [`.align_x()]` - Align horizontally (left, center, right)
- [`.align_y()`] - Align vertically (top, center, bottom)

First two methods accept a parameter of type [`Length`]. This allows us to specify how much of the available space we want to use.

[`.align_x()`] accepts [`Horizontal`] enum, [`.align_y`] accepts [`Vertical`] enum.

> The layout system in iced is intentionally simple and predictable. Rather than having a complex unified system,
> it provides these basic building blocks that can be composed to create more sophisticated layouts.

This modular approach means each widget can implement the layout behavior that makes the most sense for its purpose, while still being able to work together seamlessly through composition.

[`Length]: https://docs.iced.rs/iced/enum.Length.html
[`Horizontal`]: https://docs.iced.rs/iced/alignment/enum.Horizontal.html
[`Vertical`]: https://docs.iced.rs/iced/alignment/enum.Vertical.html
[`.center_x()`]: https://docs.iced.rs/iced/widget/container/struct.Container.html#method.center_x
[`.center_y()`]: https://docs.iced.rs/iced/widget/container/struct.Container.html#method.center_y
[`.align_x()`]: https://docs.iced.rs/iced/widget/container/struct.Container.html#method.align_x
[`.align_y()`]: https://docs.iced.rs/iced/widget/container/struct.Container.html#method.align_y
[`row`]: https://docs.iced.rs/iced/widget/macro.row.html
[`column`]: https://docs.iced.rs/iced/widget/macro.column.html
[`container`]: https://docs.iced.rs/iced/widget/container/index.html
[`.spacing()`]: https://docs.iced.rs/iced/widget/struct.Column.html#method.spacing
[`.padding()`]: https://docs.iced.rs/iced/widget/container/struct.Container.html#method.padding

> #### Note From the Author
> You reached the end of the book, for now!
>
> I think it should already serve as a quick introduction to the basics of the library.
> There is a lot more to unravel—but hopefully you are now at a point where you can start
> playing around, having fun, and experimenting further.
>
> The book is far from finished—there are a lot more topics I want to cover here, namely:
>
>   - Styling
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
