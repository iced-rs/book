# Philosophy

iced is a _very_ opinionated piece of software. It represents the culmination of almost 20 years of my personal battle against the eternal enemy: complexity[^the eternal enemy].

Complexity is bad. It creeps in. Silently. Unnoticed. And then it kills everything. Slowly. I have seen it happen time and time again. Many of my codebases have died a slow and painful death in its hands.

Amidst rotten code, I learned to unlearn[^learned to unlearn]. Each time, a little piece of a bigger puzzle was revealed. And one day, thanks to [Elm], it all seemed to click into place.

I don't claim I have all the answers, but I rarely struggle with complexity nowadays. I have developed a certain intuition—a coding philosophy—that I follow instinctively. When I design libraries, I imbue as much of this learned philosophy into them.

iced is an attempt at creating a GUI toolkit that embodies my coding philosophy to the utmost extent. If these principles do not resonate with you, I recommend you to use a different library; otherwise, frustration will certainly ensue.

In this chapter I describe the most important (and controversial!) design principles that apply to iced, both technically and ideologically.

<!-- TODO
If you are not convinced, the "Alternatives" chapter in the appendix lists great alternative crates you can use to build user interfaces in Rust.
-->

[Elm]: https://elm-lang.org

## Open Source is Not About You

> Open source is a licensing and delivery mechanism, period. It means you get the source for software and the right to use and modify it. All social impositions associated with it, including the idea of 'community-driven-development' are part of a recently-invented mythology with little basis in how things actually work. A mythology that embodies, cult-like, both a lack of support for diversity in the ways things can work and a pervasive sense of communal entitlement.
>
> — Rich Hickey, [Open Source is Not About You](https://gist.github.com/richhickey/1563cddea1002958f96e7ba9519972d9)

iced is not your run-of-the-mill popular open source project. It is not owned by a corporation. It is not a brand. It is not a business. And most importantly, it is not a community effort.

iced is just my personal project. I work on it on my own terms, on my time, and give it all away for free as open source.

I do it because I enjoy building useful things __on my own__. I don't do it to meet new people. I don't do it to collaborate with others. I don't do it to make friends. It's great if any of that happens; but it's not the main reason I share my work.

This is fairly uncommon, so certain expectations that may be taken for granted in other open source projects do not make sense here. For instance:

- I do not try to be specially welcoming to new contributors.
- I do not care about promoting the library for widespread adoption.
- I do not keep a "professional" image at all times.
- I do not delegate work to land new features quickly.
- I do not hesitate to introduce breaking changes.

"My lord! Is that legal?"[^is that legal] You bet! So if you are coming here expecting a stable, professional, politically correct, and contributor-friendly open source project... You will likely be very disappointed.

But before you leave all flustered, give me a chance to tell you about the upsides of this philosophy of work. Yes, there are some:

- Instead of handholding new contributors, I have more time to spend doing what I do best: __coding__.
- Instead of trying to promote the library, I use a completely honest and direct approach of communication. __What you see is what you get.__
- Instead of being "professional", I can be approachable, emotional, blunt, honest, controversial, and—most importantly—fun. I am a __human__, not a cold machine trying to keep appearances.
- Instead of delegating work, I build and review every single feature myself; potentially enabling a __high degree of cohesion__ not possible in many other projects.
- Instead of maintaining a stable API, I can redesign freely and let the codebase __grow organically__ as new solutions are discovered.

Pretty cool, huh? Everything has tradeoffs, and these are the ones that work for me and my projects.

With all that said, it would be reasonable for you to infer that iced must not have a great community of users. After all, I don't actively promote the library nor welcome contributors. Why would anyone stick around? And yet... Plenty of people do![^discord]

In my experience, and quite ironically, this unusual approach to open source leads to the best kind of community. The extreme level of opinionation, honesty, and transparency lets users make a quick judgement, reduces frustration, and those that stay tend to share similar values.

## Rust is All You Need
iced embraces Rust to its full extent. You will write _everything_ in plain Rust.

There is no **D**omain-**S**pecific **L**anguage for defining view logic. No crazy procedural macro magic to make view code easier to write. 

Macros, while a part of Rust, are a escape hatch. Creating a macro to meaningfully extend the language is equivalent to admitting that Rust by itself is not powerful enough. It's the same as giving up. The language has failed.

I believe Rust itself is powerful and elegant enough to express user interface code in a beautiful way, and I am not willing to give up on it without putting up a fight first. If I wanted to code using a different language, then I would have chosen a different language.

Small declarative macros are fine, but only as long as they are very limited in scope and there is an analogous, widespread counterpart that can be considered a core part of the language. For instance, iced defines `row!` and `column!` macros with the same semantics as the ubiquitous `vec!` macro—they all build a collection of items in a certain order.

Long story short, iced expects you to write all your GUI code in Rust, leveraging variables, match statements, nested scopes, iterators, functions, and generics.

## The Web is Madness

What once started as a simple invention for sharing hyper-text documents around the world has now evolved into an amalgamation of incohesive patches and standards; most shoe-horned in for the sake of velocity and backwards compatibility.

At the core of it all: a terrible crux. A seemingly benign separation of structure, style, and logic into three different languages: HTML, CSS, and JavaScript.

Except, it doesn't work. Never did, and never will. Concerns constantly leak from one layer to the other with no consistent ethos. The three different parts need to know about each other _all the time_. And so, the job of a web developer consists in creating abstractions to cope and juggle these three different layers while trying to create an illusion of cohesion; like a magician in a circus.

This crux of separation is the main issue fueling most of the web frameworks ever made. Solutions for a made up problem introduced a long time ago. An opiate for a self-inflicted illness. The Web is built on top of a bunch of awful legacy.

I don't know about you, but I have had enough of this circus.

iced completely and utterly rejects this separation—as it is simply non-sensical and insanity-inducing. Furthermore, it actively tries to stay away from anything that remotely resembles HTML, CSS, or JavaScript; for they are all incomplete solutions on their own.

When using iced, all of layout, styling, and logic are written directly in Rust as a cohesive whole—leveraging type safety and compiler guarantees as much as possible.

## Code Must be Discovered
Coding is ultimately a process of __discovery__.

The problem is your starting point, the language is your map, the compiler is your compass, and the solution is your target.

Your job as a programmer is to figure out your starting point as accurately as possible, and then let the compass guide you.

Stating and defining the problem in your language is paramount. Any mistakes here will set you down the incorrect path—likely leading you to the wrong place after smashing into walls for a while.

In order to formalize the problem, it is important to distill it to its very essence. You must avoid mixing into it any pre-conceived notion of a potential solution you may have in your mind. Failing to do so will trump your chances of achieving simplicity—which can only ever emerge organically.

iced is a specific set of solutions for problems that involve presenting interactive information to a user. As a consequence, the library tries to stay out of the way during the first stages of the discovery process—only chiming in once a solution has started to form—by decoupling itself from your types, data structures, and business logic.

> #### Note From the Author
> This chapter is not finished yet.
>
> There are still some principles I would like to write about:
>
> - Plumbing Code is Foundational
> - Generic Problems are Illusions
> - Purity Protects Sanity
> - Be Competent or be Better
>
> It takes inspiration to turn intuition into words, so I don't know when I will get to it. Stay tuned!

[^the eternal enemy]: [The Grug Brained Developer](https://grugbrain.dev/#grug-on-complexity)
[^learned to unlearn]: [Learning to Unlearn](https://www.youtube.com/watch?v=wrwxC9taL8w)
[^is that legal]: [I will make it legal](https://youtu.be/nz20lu2AM2k)
[^discord]: Join us in [the Discord server](https://discord.gg/3xZJ65GAhd)!
