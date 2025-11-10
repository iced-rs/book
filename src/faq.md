# Frequently Asked Questions

## Why is the documentation so bad?

The documentation is bad because, unlike most other open-source projects, `iced` unapologetically does not cater to _you_.

`iced` is not owned by a corporation. It is not a brand. It is not a business. It is not even a community effort. It's a love project built by a single person and given away for free. This is deliberate.

As a result, I have no external incentives to make the library more appealing to newcomers and beginners. I do not care whether you will like the library and I have no reasons to try to convince you to use it.

The gist of it is that

- I enjoy coding more than I enjoy writing documentation,
- I don't like spoonfeeding people as if they are stupid, and
- I ultimately don't care about wide adoption.

When I do write documentation, I don't do it with a promotional intent. Instead, I do it mainly to test whether I can explain the library in simple terms—starting from the problem. This book being a clear attempt at it!

Thus, the existing documentation is not there to cater to a wide audience and convince you to use the library in its current state. It's mainly there for me to cement design choices and have fun. The output is a side effect.

I believe that this approach will eventually lead to a fully fleshed out set of learning materials for everyone, with the least amount of wasted effort on my end. It'll just take a bunch of time!

## Why do none of the examples compile?
All of the examples are compiled in [a GitHub CI workflow](https://github.com/iced-rs/iced/actions/workflows/test.yml?query=branch%3Amaster+event%3Apush) for every single commit pushed to the official repository. They _very_ rarely break and, if they do, I fix them quickly. So, you are likely wrong. The examples do compile.

Many newcomers make the rookie mistake of assuming that they can copy code from the `master` branch and then expect it to work with a [crates.io release](https://crates.io/crates/iced) from a year ago. Some even choose to blame the project for their own ignorance and incompetence. I'm always quite baffled by this.

[Release tags](https://github.com/iced-rs/iced/tags) exist for a reason.

## Why do you change the entire API on every release?
Because I am a terrible engineer and I want you all to suffer with me.

Jokes aside, I am always trying to come up with the best way to build GUIs in Rust. Why would I not change the API? I certainly owe absolutely nothing to the users that benefit from my work for free.

If you are not happy with it, feel free to ask for a refund, then fork the project and maintain it yourself.

## Is `iced` even used seriously anywhere?

Yes, here and there.

- [Kraken] has been shipping [a desktop application](https://www.kraken.com/en-es/desktop) to thousands of users for years.
- [System76] maintains [a soft fork] that powers their new [COSMIC] desktop environment.
- Plenty of popular open-source projects use it—like [Halloy] and [Sniffnet].

Check out the [project showcase] if you want to find out more.

[System76]: https://system76.com
[Kraken]: https://www.kraken.com
[COSMIC]: https://system76.com/cosmic
[a soft fork]: https://github.com/pop-os/iced
[Halloy]: https://github.com/squidowl/halloy
[Sniffnet]: https://sniffnet.net/
[project showcase]: https://iced.rs/#showcase

## When will `<insert feature>` be developed?
`iced` is a one man project. Every single line of code is either written or reviewed directly by me.

And I am just a dude that enjoys coding and building stuff. I give away some of my work for free. I do this with no timelines. No promises. No expectations. No delegation. I like it this way.

That said, there is [a visual roadmap][roadmap] that can give you a certain idea of my current mental model of the future of the library. My mind changes often, though; and so may the roadmap!

[roadmap]: https://whimsical.com/roadmap-iced-7vhq6R35Lp3TmYH4WeYwLM

## When will my PR get reviewed?
I tend to review contributions right before a release. Releases happen rarely; so it may be months until I get to take a look at your code.

I also may choose to prioritize some people, like my friends. I don't care about being fair to everyone.

In any case, if your contribution comes with the expectation that I must eagerly review it, then I kindly ask you to stay away from any of my open-source projects.

## How do I structure a large application?
You split your application into multiple screens, and then use simple composition.

[The Pocket Guide] has [a specific section that showcases this approach](https://docs.rs/iced/0.13.1/iced/#scaling-applications).

## How can my application receive updates from a channel? 
You can use [`Task::run`] to generate messages from an asynchronous [`Stream`].

Alternatively, if you control the creation of the channel; you can use [`Subscription::run`].

[The Pocket Guide]: https://docs.rs/iced/0.13.1/iced/index.html#the-pocket-guide
[`Task::run`]: https://docs.rs/iced/0.13.1/iced/task/struct.Task.html#method.run
[`Subscription::run`]: https://docs.rs/iced/0.13.1/iced/struct.Subscription.html#method.run
[`Stream`]: https://docs.rs/futures/latest/futures/stream/trait.Stream.html

## Does `iced` support Right-To-Left text and/or CJK scripts?
The seeds are planted, but the edge cases may not be fully handled yet.

Specifically, text editing likely has a bunch of issues still. However, [Input Method Editors] are a new feature in the upcoming `0.14` release.

In any case, proper support is in the [roadmap].

[Input Method Editors]: https://github.com/iced-rs/iced/pull/2777

## When are the `view` and `subscription` functions called?
After every batch of messages and `update` calls.

But this is an implementation detail. You should _never_ rely on this. Try to treat these functions as declarative, stateless functions.

## Does `iced` redraw all the time?!
No. Not anymore!

It used to be the case that `iced` would redraw the entire window on every tiny mouse movement but, since `0.14`, it supports and enables [reactive rendering] by default.

[reactive rendering]: https://github.com/iced-rs/iced/pull/2662

## I am getting a panic saying there is no reactor running. What is going on?
You are probably using `Task` to execute a `Future` that needs the `tokio` executor:

```text
there is no reactor running, must be called from the context of a Tokio 1.x runtime
```

You should be able to fix this issue by enabling [the `tokio` feature flag] in the `iced` crate:

```toml
iced = { version = "0.13", features = ["tokio"] }
```

[the `tokio` feature flag]: https://docs.rs/crate/iced/latest/features#tokio
