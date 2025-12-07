# Container
[The `Container` widget] can apply padding, alignment, and styling to its contents.

Since it allows you to easily position and decorate existing widgets, it is considered one of the main building blocks in iced. You will need to use it often!

As usual, you can build one with the [`container`] helper found in the [`widget`] module.

[`container`]: https://docs.rs/iced/latest/iced/widget/fn.container.html
[`widget`]: https://docs.rs/iced/latest/iced/widget/index.html
[The `Container` widget]: https://docs.rs/iced/latest/iced/widget/struct.Container.html

```rust,ignore,iced,static,height=60
# use iced::widget::Container;
# use iced::Never;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Container<'_, Never> {
use iced::widget::container;

container("This is a bordered box!")
    .padding(10)
    .style(container::bordered_box)
# }
```

## Padding
You can leverage the `padding` method of a `Container` to apply some padding its bounds.

Each side can be configured independently. The `padding` module has a bunch of convenient helpers that make this easy.


```rust,ignore,iced,static,height=100
# use iced::widget::Container;
# use iced::Never;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Container<'_, Never> {
use iced::padding;
use iced::widget::container;

container("Independent padding!")
    .padding(padding::vertical(30).left(20).right(80))
    .style(container::bordered_box)
# }
```

## Alignment
Analogously to the `Text` widget, a `Container` will align its contents inside of its bounds.

By default, a `Container` inherits the sizing strategy of its contents. Therefore, all of the alignment methods ask for a new `Length` that will be used to determine the final bounds.

You can think of a `Container` as a framed picture. The frame itself is the `Container` and the picture is the content, which can be aligned inside in different ways.

```rust,ignore,iced,static,height=100
# use iced::widget::Container;
# use iced::Never;
# 
# fn main() -> iced::Result {
#     iced::run((), view)
# }
# 
# fn view(_: &()) -> Container<'_, Never> {
use iced::widget::container;
use iced::Fill;

let my_box = container("Bottom right!")
    .padding(10)
    .style(container::primary);

container(my_box)
    .padding(10)
    .align_bottom(Fill)
    .align_right(Fill)
    .style(container::bordered_box)
# }
```
