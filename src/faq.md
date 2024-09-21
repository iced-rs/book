# Frequently Asked Questions

## When Will the Book Be Finished?
Soon™. Open source is a gift; so whenever I feel like it.

## How Do I Scale a Large Application?
You split your application into multiple screens, and then use simple composition.

[The Pocket Guide] has [a specific section that showcases this approach](https://docs.rs/iced/0.13.1/iced/#scaling-applications).

## How Can My Application Receive Updates From a Channel? 
You can use [`Task::run`] to generate messages from an asynchronous [`Stream`].

Alternatively, if you control the creation of the channel; you can use [`Subscription::run`].

[The Pocket Guide]: https://docs.rs/iced/0.13.1/iced/index.html#the-pocket-guide
[`Task::run`]: https://docs.rs/iced/0.13.1/iced/task/struct.Task.html#method.run
[`Subscription::run`]: https://docs.rs/iced/0.13.1/iced/struct.Subscription.html#method.run
[`Stream`]: https://docs.rs/futures/latest/futures/stream/trait.Stream.html

## Does Iced Support Right-To-Left Text and/or CJK scripts?
Not very well yet!

You may be able to render some scripts using [`Text::shaping`] with [`Shaping::Advanced`],
but text editing for these scripts is not yet supported; and neither are [Input Method Editors].

These features are in the [`ROADMAP`], however!

[`Text::shaping`]: https://docs.rs/iced/0.13.1/iced/widget/text/type.Text.html#method.shaping
[`Shaping::Advanced`]: https://docs.rs/iced/0.13.1/iced/widget/text/enum.Shaping.html#variant.Advanced
[Input Method Editors]: https://en.wikipedia.org/wiki/Input_method
[`ROADMAP`]: https://whimsical.com/roadmap-iced-7vhq6R35Lp3TmYH4WeYwLM

## When Are the `view` and `subscription` Functions Called?
After every batch of messages and `update` calls. But this is an implementation detail;
and should never rely on this.

Try to treat these functions as declarative, stateless functions.

## Does Iced Redraw All the Time?!
Yes! iced currently redraws after every runtime event; including tiny mouse movements.

There are plans to redraw less frequently by detecting widget state changes, but performance has not
been a priority so far.

The renderers do perform quite a lot of caching; so redrawing is quite cheap. As a result,
this is rarely an issue for most use cases!

## I Am Getting A Panic Saying There Is No Reactor Running. What Is Going On?
You are probably using `Task` to execute a `Future` that needs the `tokio` executor:

```text
there is no reactor running, must be called from the context of a Tokio 1.x runtime
```

You should be able to fix this issue by enabling [the `tokio` feature flag] in the `iced` crate:

```toml
iced = { version = "0.13", features = ["tokio"] }
```

[the `tokio` feature flag]: https://docs.rs/crate/iced/latest/features#tokio
