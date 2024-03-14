# The Runtime

We can call this `view` method anytime to obtain the latest widgets of our counter interface. For instance, we could keep
simulating a user and some interactions:

```rust
// Initialize our state
let mut counter = Counter { value: 0 };

// Simulate some interactions
counter.update(Message::Increment);
counter.update(Message::Increment);
counter.update(Message::Decrement);

// Dictate the interface
let interface = counter.view();
```
