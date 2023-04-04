# The Elm Architecture

The Elm Architecture is a method of organizing your application. It is pioneered by the Elm project, hence the name. Essentially, you tell the library to draw something, the it will send back *messages* of what has happened. The Elm Architecture can be broken down into four main parts:

**Model**: The model is essentially the state of your application. It is where data in the program will be stored.

**View Logic**: This defines what will actually be drawn to the screen. It had access to the model.

**Messages**: When your application is interacted with, the library will return a message. There can be messages for everything from button presses to letters typed in a textbox.

**Update Logic**: This will be what takes in messages, and updates the model accordingly.

This approach tends to organize your code nicely, and works well with Rust's borrow checker. In the rest of this book, you'll learn details about all of these, and how to use them effectively in your Iced project.

Feel free to refer to [Elm's documentation](https://guide.elm-lang.org/architecture/) if you would like to learn more.
