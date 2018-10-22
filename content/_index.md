---
title: Home
menu: main
weight: -270
---

# Preface

## About

Welcome to **The Node.js and React Beginner Book**. The aim of this book is to teach you everything you need to know to build full-blown web applications that are useful, reliable, and fast, using modern JavaScript features and tools.

We will start with the basics and build on these step-by-step. Everything is explained in detail and taught at just the right pace, making sure that everything sticks and can be understood easily. At the end of the book, you will have built a simple yet complete Node.js HTTP web server that provides a JSON-based REST API, and a simple yet complete client-side React Single-Page Application that will make use of this API. Together, the Node.js API server and the React SPA will 

All you need to bring to the table is a basic understanding of programming in general. 


## Status

You are reading the a work-in-progress version of this book. It was last updated on September 27, 2018.

The code samples in this book are tested to work with version 10.x of Node.js.

This site allows you to read the first 20 pages of this book for free. The complete text is available as a DRM-free eBook (PDF, ePub and Kindle format). More info is available at the end of the free part. 


## Intended audience

This document will probably fit best for readers that have a background similar to my own: experienced with at least one object-oriented language like Ruby, Python, PHP or Java, only little experience with JavaScript, and completely new to Node.js and React.

Aiming at developers that already have experience with other programming languages means that this document won't cover really basic stuff - you should already know what a variable is, how an `if` statement works, what a `string` and an `integer` are, and how to run commands on the Command Line Interface of your computer.

However, because functions and objects in JavaScript are different from their counterparts in most other languages, these will be explained in more detail.


# Getting started

## JavaScript and You

Before we dive into all the technical stuff, let's take a moment and talk about you and your relationship with JavaScript. This chapter is here to allow you to estimate if reading this document any further makes sense for you.

If you are like me, you started with HTML "development" long ago, by writing HTML documents. You came across this funny thing called JavaScript, but you only used it in a very basic way, adding interactivity to your web pages every now and then.

What you really wanted was "the real thing", you wanted to know how to build complex web sites - you learned a programming language like PHP, Ruby, or Java, and started writing "backend" code.

Nevertheless, you kept an eye on JavaScript, and you saw that with the introduction of jQuery, things got more advanced in JavaScript land, that this language really was about more than `window.open()`.

However, it was all still very frontend-oriented, add-some-dynamic-sprinkles-to-a-web-page stuff, and although it was nice to have jQuery at your disposal whenever you felt like spicing up a web page, at the end of the day you were, at best, a JavaScript user, but not a JavaScript developer.

And then came Node.js. JavaScript on the server, how cool is that? And then React and friends: Finally building complex user interfaces with JavaScript doesn't seem like a crazy idea anymore. Also, JavaScript itself evolved as a language: ES6 and JSX look really promising, but also a bit intimidating - what exactly is "Babel", and what language features can be used where?

You decided that it's about time to check out the old, new JavaScript. But wait, writing Node.js and React applications is one thing; understanding why they need to be written the way they are written means - understanding JavaScript. And this time for real.

Here is the problem: Because JavaScript really lives two, maybe even three lives (the funny little DHTML helper from the mid-90's, the more serious frontend stuff like jQuery and the likes, and now server-side, React, ES6, JSX etc.), it's not that easy to find information that helps you to learn JavaScript the "right" way, in order to write Node.js applications in a fashion that makes you feel you are not just using JavaScript, you are actually developing it.

Because that's the catch: you already are an experienced developer, you don't want to learn a new technique by just hacking around and mis-using it; you want to be sure that you are approaching it from the right angle.

There is, of course, excellent documentation out there. But documentation alone sometimes isn't enough. What is needed is guidance.

My goal is to provide this kind of guidance. 


## Setting up your software development environment

In order to be able to create JavaScript applications with Node.js and React, you need to have a collection of programs and tools installed on your computer, which together make up the Software Development Environment that allows you to work efficiently and build great stuff.

This environment consists of the following components:

- A powerful code editor, also called Integrated Development Environment (IDE)
- The Node.js interpreter and its supporting tools, used to run your application code and to manage additional code libraries used by your own code
- A command line interpreter, also called a terminal, which you will use to run important commands on
- A web browser, in order to use and test the web applications which you will build


### The browser and the terminal

It's more than likely that you already have a terminal and a web browser on your system. It doesn't matter if you use Firefox, Chrome, Microsoft Edge, Safari, or Opera. Personally, I prefer Firefox, but every modern web browser will do.

If you are working on a Windows system, your command line interface or terminal is `cmd.exe`. Simply type `cmd` with the Start menu open, and hit enter. This will open a terminal window.

On macOS, the terminal application is simply called "Terminal". Simply launch it from folder "Utilities", which resides in folder "Applications". Alternatively, you can hit CMD+Space to bring up Spotlight Search, and enter "Terminal" in order to launch it.

Linux systems come in so many different forms and shapes that I can only assume you know how to open a terminal window. On Ubuntu systems, it is simply a matter of clicking the Ubuntu icon in the upper left corner of the screen and typing "Terminal" into the search form.


### The code editor

There a many different code editors / IDEs available that enable you to write Node.js and React JavaScript code. Which one fits best for you really is a matter of taste.

Personally, I use *IntelliJ IDEA Ultimate Edition* from JetBrains, but this is just one possible option.

A very good IDE that runs on all three platforms (Windows, macOS, Linux), is available for free, has great JavaScript, Node.js, and React support, and is well-regarded in the JavaScript developer community is *Visual Studio Code* from Microsoft, often simply called *Code*. Visit https://code.visualstudio.com/ to download it for your platform.

Simply follow the installation instructions, and you are good to go. In the course of this book we will also install some extensions for Node.js and React, but for now the base install does the job.


### Node.js

Last but not least, we need to install Node.js itself. While a code editor is all that is needed to write JavaScript code, we would not be able to do anything useful with it. In order to turn our code into a running Node.js application, we need the so-called Node.js interpreter. This is a program which reads our JavaScript source code, interprets its meaning, and executes it. It also provides *NPM*, the Node.js Package Manager, which we will use to install and manage third party JavaScript libraries, among other things.

No matter what platform you are on, the first step is to head over to https://nodejs.org/en/download/.

There, you are presented with a choice between the *LTS* version and the *Current* version of Node.js. The LTS version is older (version 8.x as of this writing), but more stable and with a longer support window. However, by now, its End-of-life date is already earlier than the one for the *Current* release version 10.x, so we don't really loose out by choosing the latest and greatest. Therefore, this book assumes an installation of Node.js 10. Have a look at https://github.com/nodejs/Release to always get an up-to-date release overview.

With this out of the way, switch to the "Current" tab on the Downloads page, and then choose the package that fits your platform. For Windows, you need to choose between 32-bit and 64-bit - it is very likely that your Windows is 64-bit. Also, choose the .msi Installer, not the .zip Binary.

For macOS, choose the 64-bit .pkg Installer. In case you are already using *Homebrew* on your Mac (see https://brew.sh for more details), you might want to use that to install Node.js and NPM instead, via `brew install node@10 npm`.

On Linux, again the installation heavily depends on your distribution. If you are running Ubuntu 18.04, a simple `apt-get install nodejs npm` is all you need - however, this will install Node.js 8.x, not 10.x. That's quite likely not a problem for the course of this book. If, however, you still want to install the recommended 10.x version, then please have a look at https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04#installing-using-a-ppa and follow the steps described there.

If you decided to use an installer for Windows or macOS, then please just follow the installer instructions. Note that on Windows, the installer will set up a special Node.js Command Line Interface - always start this one when you want to work with Node.js on the terminal!


You can verify that all is well by running the following two commands in a terminal session after you have finished the installation:

```
node -v
npm -v
```

The output should look similar to the following:

```
$> node -v
v10.12.0

~$ > npm -v
6.4.1
```

This shows that Node.js version 10.12.0 and NPM version 6.4.1 have been installed successfully.


# Some first experiments

## "Hello, World"

Ok, let's finally jump in the cold water and write our very first Node.js application: "Hello, World".

To so, launch your code editor and create a new file called *helloworld.js*.

We want our first application to write "Hello, World" on the console (to [stdout](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)), to be precise), and here is the code needed to do that:

```javascript
console.log("Hello, World");
```

Save the file, and make Node.js read, interpret, and execute it:

```text
$> node helloworld.js

Hello, World
```

It's probably obvious that you need to first `cd` to the directory which contains the *helloworld.js* file. If you try to invoke Node.js on a file that does not exist, it will print an error, like this:

```text
~$ > node wrongname.js
internal/modules/cjs/loader.js:583
    throw err;
    ^

Error: Cannot find module '/Users/manuelkiessling/wrongname.js'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:581:15)
    at Function.Module._load (internal/modules/cjs/loader.js:507:25)
    at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
    at startup (internal/bootstrap/node.js:279:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:752:3)
```

Note how the error message reads *Cannot find module*, and not *Cannot find file*. We will talk about the concept of modules later.

For now, let's dissect our application and experiment a bit.

If we put our innocent line of code under the microscope, we see that it consists of three different parts.

We are invoking a function named `log`, which is defined on an object called `console`, with one string parameter that has the value `Hello, World`;

Everything else is just language syntax: an object and its functions are separated by a dot `.`, function call parameters are enclosed in parentheses `()`, string values are enclosed in double `"` quotes (single `'` quotes are fine, too, and there is also the backtick operator which we will properly introduce later), and lines end with a semicolon `;` - which optional in some cases and promptly sparked its own [religious war](https://www.theregister.co.uk/2018/01/12/javascript_technical_group_semicolons/). In this book, we will stick to double quotes and semicolons.

Can we also print numbers instead of strings? You bet we can:

```javascript
console.log("Hello, World");
```

```text
$> node helloworld.js

42
```

Mh... let's get a little crazy. What if we try to print out an object? The only object we know so far is `console` itself, so let's try to print that:

```javascript
console.log(console);
```

```text
$> node helloworld.js

Console {
  log: [Function: bound consoleCall],
  debug: [Function: bound consoleCall],
  info: [Function: bound consoleCall],
  dirxml: [Function: bound consoleCall],
  warn: [Function: bound consoleCall],
  error: [Function: bound consoleCall],
  dir: [Function: bound consoleCall],
...
```

Interesting! Note that I have abbreviated the output to save valuable ebook paper, but what we see here is that `console.log` is able to print the outline of an object and its members, which happen to be mostly functions. This is certainly handy!

You might wonder where `console` comes from in the first place. We didn't define an object of this name ourselves, and yet it's at our disposal.

This shows that Node.js is not only an interpreter that turns JavaScript code into a running application. It also ships with its own bundle of ready-to-use JavaScript code, the so-called "lib". And the lib itself is nothing mysterious: it's just JavaScript code. For example, you can check out the code for the `console.log` function [on GitHub at /lib/console.js](https://github.com/nodejs/node/blob/0f84120/lib/console.js#L198-L204).

Let's play around further. We can define our own objects:

```javascript
const myObject = {};

console.log(myObject);
```

This is an object without any members, so the output is not exactly mind-boggling.

Note the `const` keyword we used to declare our object. It's one of three ways to declare a variable in ES6 JavaScript - `var`, `let` an `const`. Previous versions of JavaScript only supported `var`.

While variables declared using *var* and *let* can be reassigned to a new value, this doesn't work for those declared with *const*:

```javascript
var v = "this is a var";

let l = "this is a let";

const c = "this is a const";

console.log(v);
console.log(l);
console.log(c);


v = "this is a var, changed";

l = "this is a let, changed";

c = "this is a const, changed";

console.log(v);
console.log(l);
console.log(c);
```

```text
$> node helloworld.js

this is a var
this is a let
this is a const

/Users/manuelkiessling/helloworld.js:19

c = "this is a const, changed";
  ^
TypeError: Assignment to constant variable.
...
```

However, there is an important subtlety when we say that variables declared with *const* cannot be reassigned to a new value. This can be shown with the following example:

```javascript
const myObject = {};

console.log(myObject);

myObject.info = "this object has been changed";

console.log(myObject);
```

```text
$> node helloworld.js

{}
{ info: 'this object has been changed' }
```

The subtlety here is that this in fact is not a reassignment - `myObject` still refers to the same object instance that was assigned on the first line. On line 5, the object itself changes, but it is not a new object instance - it simply gains a member.

This is different from the following:

```javascript
const myObject = {};

console.log(myObject);

myObject = { info: "this object has been changed" };

console.log(myObject);
```

Here, we do try to assign a completely new object instance to the variable `myObject`, and because `myObject` has been declared a `const`, this fails:

```text
$> node helloworld.js

{}
/Users/manuelkiessling/helloworld.js:5

myObject = { info: "this object has been changed" };
         ^
TypeError: Assignment to constant variable.
```

My recommendation regarding the use of *var*, *let* and *const* is as follows:

- Never use *var*, because it doesn't give you anything useful in comparison to *let*, except for some irritating scope issues. The main reason that *var* is still part of the language is to avoid breaking old code.

- Use *const* whenever possible, because it protects you from accidentally reassigning values to variables, which can prevent several types of subtle bugs in your code.

- Use *let* when you know that you really want to reassign values. You will see that this surprisingly seldom is the case.


## A polite logger

Back to our object. Let's change and extend it so that it has a more useful name, and provides a function that allows to do console logging in a polite way:

```javascript
const politeConsole = {
  log: function(text) {
    console.log("For your consideration: " + text);
  }
};

politeConsole.log("Hello, World");
```

The output now looks like this:

```text
$> node helloworld.js

For your consideration: Hello, World
```

Just like we called the `log` function on `console` before, we can now call a function `log` on our own `politeConsole` (which in turn calls `console.log`).

Let's now take a look at something that is not typically possible or commonly done in "conventional" languages like PHP or Java, but is very natural in JavaScript.

Assume that while we want our keep our `politeConsole` object in charge of making log output more polite, we want more freedom regarding the "typography" of the text that is written out.

For example, we might sometimes want to write out a console message in ALL UPPERCASE. We could call the `politeConsole.log` function as follows:

```javascript
const politeConsole = {
  log: function(text) {
    console.log("For your consideration: " + text);
  }
};

politeConsole.log("Hello, World".toUpperCase());
```

but this would result in

```text
For your consideration: HELLO, WORLD
```

This is not what we want - we want the whole text to be written in all uppercase, like this:

```text
FOR YOUR CONSIDERATION: HELLO, WORLD
```

We could, of course, extend `politeConsole.log` accordingly - for example, by adding a boolean parameter `uppercase` that defaults to `false`, but can be passed with `true` by a function caller.

While this is not inherently wrong, it is not very flexible. What if later on we want to be able to have our log message written out all lowercase? Or base64? Or have it transformed into a JSON representation?

We would have to touch `politeConsole` again and again, and the signature of function `politeConsole.log` would become more and more complex.

But there is another, more flexible solution. Instead of having `politeConsole` decide on text formatting, we generalize the fact that the "polite" message might be transformed. The transformation itself however is done outside of `politeConsole`.


## Passing functions as values

This can be achieved with the following steps:

- extend `politeConsole.log` with a parameter `transform` that takes a function as its value
- instead of directly writing out the `"For your consideration: " + text` with `console.log`, write out the result of `transform("For your consideration: " + text)` if `transform` is a function
- when calling `politeConsole.log`, callers optionally pass a transform function

This is possible because in JavaScript, functions are a so-called "first class citizens". You can define and call functions like in other languages, but you are not limited to that. Functions can be passed around and passed as parameters to other functions, just like passing numbers or strings.

Here is how this looks in our example:

```javascript
const politeConsole = {
  log: function(text, transform) {
    let politeText = "For your consideration: " + text;
    if (typeof(transform) === "function") {
      politeText = transform(politeText);
    }
    console.log(politeText);
  }
};

function upperCaseText(text) {
    return text.toUpperCase();
}

politeConsole.log("Hello, World", upperCaseText);

politeConsole.log("Hello, World");
```

When you run this, the output is as follows:

```text
FOR YOUR CONSIDERATION: HELLO, WORLD
For your consideration: Hello, World
```

There's quite a lot of new stuff going on in a few lines of code, so let's dissect it step by step.

The `log` function got an additional parameter, `transform`. In the function body, we analyze the type of the parameter that has been passed to us under that name. We check if it is a function, using `typeof`. If it is indeed a function, and not `null` or `undefined` or a `string` etc., then we know we can call it.

Which is what we do in this case: We call the `transform` function that got passed to us, passing, in turn, our already "politelized" text. Note how `politeConsole.log` doesn't know anything about the passed function (other than the fact that it is, indeed, a function).

The result of running `politeText` through `transform` is then re-assigned back to `politeText`, which is possible because we defined it with `let` instead of `const`.

If `transform` is not a function (e.g. because the caller hasn't passed anything for this parameter, or passed something else, like a string), then `politeText` is not transformed. Transformed or not, the final `politeText` is finally printed to the screen with `console.log`.

On line 15, we make use of this new capability. We call `politeConsole.log` with two parameters: the text itself, and the name of the function that should be used to transform the output before it is written to the console.

In this case, it's a simple function declared on lines 11-13. It takes a parameter `text`, and returns the uppercase version of that text.

Note how on line 15, the second function call parameter is `upperCaseText`, not `upperCaseText()` - it is important to not add the parentheses here! If we would add those, like this:


```javascript
politeConsole.log("Hello, World", upperCaseText());
```

then what would be passed to `politeConsole.log` as the second parameter `transform` is not the function `upperCaseText`, but instead the **result** of calling `upperCaseText()` - which, in this case, would result in `TypeError: Cannot read property 'toUpperCase' of undefined`, because line 12, `return text.toUpperCase()`, cannot work if nothing has been passed for parameter `text` of function `upperCaseText`.

In other words: Always make sure to pass the **function**, not the **function result**.


## Anonymous functions

The code above works as intended, but can be improved significantly. For example, we don't actually need to explicitly declare and name the `upperCaseText` function - we can "inline" this declaration, like so:

```javascript
const politeConsole = {
  log: function(text, transform) {
    let politeText = "For your consideration: " + text;
    if (typeof(transform) === "function") {
      politeText = transform(politeText);
    }
    console.log(politeText);
  }
};

politeConsole.log(
    "Hello, World",
    function(text) { return text.toUpperCase(); }
);
```

This way, we declared an *anonymous function* right where we want to pass it. It doesn't exist outside of the function call to `politeConsole.log` - it is declared inline, passed, used, and then discarded. 

And thanks to the new ES6 language features of JavaScript, we can further refactor the code and make it even more concise (I'm only showing the `politeConsole.log` call now):


```javascript
politeConsole.log(
    "Hello, World",
    text => text.toUpperCase()
);
```

No `function` keyword needed - the new `=>`, or "arrow" operator makes this a function declaration.

No need to put the function parameter in `()` parentheses, as long as it's the only parameter.

No need to put the function body in `{}` brackets, as long as it contains only one line.

No need for a `return` statement - in a body without brackets, the result of the body is implicitly returned.

This syntax is not limited to anonymous function declarations - here are a couple of function declarations that are all valid:

```javascript
function upper1(text) {
  return text.toUpperCase();
}

const upper2 = text => text.toUpperCase();

const lowerAndUpper =
  (lowertext, uppertext) =>
    lowertext.toLowerCase() + uppertext.toUpperCase();

const complexLowerAndUpper = (lowertext, uppertext) => {
  if (lowertext === "") {
    console.error("lowertext parameter is empty!");
    return "";
  } else {
    return lowertext.toLowerCase() + uppertext.toUpperCase();
  }
};

console.log(upper1("upper"));

console.log(upper2("upper"));

console.log(lowerAndUpper("lower", "upper"));

console.log(complexLowerAndUpper("lower", "upper"));

console.log(complexLowerAndUpper("", "upper"));
```

From here on, we will declare all functions, anonymous and named, using the new and concise arrow operator syntax, and named function variables will be declared as `const`.

That said, we can apply a final optimization to our code:

```javascript
const politeConsole = {
  log: (text, transform) => {
    let politeText = "For your consideration: " + text;
    if (typeof(transform) === "function") {
      politeText = transform(politeText);
    }
    console.log(politeText);
  }
};

politeConsole.log("Hello, World", function(text) { return text.toUpperCase(); });
```

With this, even the function declaration on line 2 uses the short form.


## Further readings

- [Stevey's Blog Rants: Execution in the Kingdom of Nouns](https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html)



# A first real Node.js application

So, this has been a nice first trip into Node.js land, but now it's time to get more serious. Let's write a first real app that does something useful.

While it is possible to write nearly any kind of application imaginable with Node.js, including 3D applications, Node.js isn't a good fit for every type of application.

One area that is very natural for Node.js software development is network servers. And Node.js comes with all the batteries included that make writing an HTTP web server relatively straight-forward.

Thus, this is our next step: writing a Node.js server application that responds to HTTP requests.


## The requirements

More specifically, we will create a very simple REST API server. This API will allow us to add, list, and delete Todo items - the API will thus serve as the backend for the React Single-Page Application that we are going to build in the course of this book.

When finished, the API will allow the following operations:

- Sending a POST request to `/api/todos/` with a JSON object like `{"title": "Hello, World"}` will create a new Todo item
- Sending a GET request to `/api/todos/` will return a list of all Todo items, like this: `[ {"id": 1, "title": "Hello, World"}, {"id": 2, "title": "Foo bar"} ]`
- Sending a DELETE request to `/api/todos/:id` will remove the Todo item with the given id

In the final version, it is the React application which will send these requests and handle the responses from the API of the web server. However, we will fully implement the API first, and test it with a pure HTTP client like `curl` before we even start working on the React app.


## The structure of Node.js applications

Before we dive into the actual code base of such an application, let's take a moment and have a look at how the code bases of Node.js applications are structured.

Of course, for small experiments or single-purpose scripts, putting all the JavaScript code into a single file, like we did in *helloworld.js*, is perfectly fine. Even for huge and complex code bases, there is nothing that forbids putting all the tens of thousands of lines of code into just one file. But as in practically any other programming language out there, this wouldn't exactly make life easier.

The primary structural component of Node.js code bases is the *module*, and the module system allows to split large code bases into multiple files.

There are three categories of modules that we can use in our applications:

- Modules that ship with Node.js
- Modules that are provided by third parties and that we make available in our own code bases via dependency management tools like NPM
- Modules that we write ourselves

We will get in contact with all three types of modules in due time.

Creating and using modules ourselves is simple. The central idea behind the module system is that the code in one file *exports* elements (e.g. an object), and code in another file *imports* the exported element, which enables it to use that element as if it was declared in the same file.

We can transform the code file that defines `politeConsole` into a module by exporting the `politeConsole` object, and import and use that object in another file.

To do so, rename *helloworld.js* into *politeConsole.js* and edit its contents, resulting in the following:

```javascript
const politeConsole = {
  log: (text, transform) => {
    let politeText = "For your consideration: " + text;
    if (typeof(transform) === "function") {
      politeText = transform(politeText);
    }
    console.log(politeText);
  }
};

module.exports = politeConsole;
```

To transform our code file into a module that can be imported elsewhere, we simply removed any code outside of the `politeConsole` definition, and we assigned the `politeConsole` object to the attribute `exports` on special object `module`. This object is what makes the module system tick in Node.js - whatever we assign to its `exports` attribute in one file can be imported into and used in other code files.

To illustrate this, again create a file *helloworld.js* (remember that we renamed the existing *helloworld.js* file to *politeConsole.js* before).

Put the following code into *helloworld.js*:

```javascript
const politeConsole = require("./politeConsole");

politeConsole.log("Hello, World");
```

As you can see, we declare a const `politeConsole`, but instead of *defining* its value ourselves, we *assign* a value using the special function `require`. This function takes the source of a module as its parameter.

For internal Node.js modules and modules that we manage as external dependencies (more on this later), the source of a module is simply its name. But because we want to refer to our own module in file *politeConsole.js*, we pass the path to the file containing the module as its source. Because file *helloworld.js* and file *politeConsole* are located in the same folder, and because the file extension isn't required, `./politeConsole` does the job. Feel free to use the full path, `./politeConsole.js`, if you like. Throughout the book, we will leave the file extension out.

I would like to stress that really nothing special happens by exporting stuff in a module via `module.exports` and importing it via `require`. For example, instead of passing the whole object, you can pass only the function defined on its `log` attribute:

*politeconsole.js:*

```javascript 
const politeConsole = {
  log: (text, transform) => {
    let politeText = "For your consideration: " + text;
    if (typeof(transform) === "function") {
      politeText = transform(politeText);
    }
    console.log(politeText);
  }
};

module.exports = politeConsole.log;
```

*helloworld.js:*

```javascript
const politeConsoleLog = require("./politeConsole");

politeConsoleLog("Hello, World");
```

Furthermore, you may want to export multiple things from a module if it defines more than one thing - no problem, `module.exports` can be an object with multiple attributes:

*politeConsole.js:*

```javascript
const normalPoliteConsole = {
  log: (text, transform) => {
    let politeText = "For your consideration: " + text;
    if (typeof(transform) === "function") {
      politeText = transform(politeText);
    }
    console.log(politeText);
  }
};


const extremePoliteConsole = {
  log: (text, transform) => {
    let politeText = "For your consideration, your highness: " + text;
    if (typeof(transform) === "function") {
      politeText = transform(politeText);
    }
    console.log(politeText);
  }
};


module.exports = {
  normalPoliteConsole: normalPoliteConsole,
  extremePoliteConsole: extremePoliteConsole
};
```

*helloworld.js:*

```javascript
const politeConsole = require("./politeConsole");

politeConsole.normalPoliteConsole.log("Hello, World");
politeConsole.extremePoliteConsole.log("Hello, World");
```

The version of *politeConsole.js* above presents the opportunity to introduce another ES6 nicety. Instead of explicitly
declaring object attributes as key-value pairs, like so:

```javascript
module.exports = {
  normalPoliteConsole: normalPoliteConsole,
  extremePoliteConsole: extremePoliteConsole
};
```

we can as well declare the object attributes using only the values:

```javascript
module.exports = {
  normalPoliteConsole,
  extremePoliteConsole
};
```

This is called *Object Property Value Shorthand*, and for it to work as expected, naming things correctly obviously is important.

While in the traditional syntax something like

```javascript
const a = "foo";

const obj = {
    b: a
};

console.log(obj.b);
```

works,

```javascript
const a = "foo";

const obj = {
    a
};

console.log(obj.b);
```

cannot work because there is no way for the JavaScript interpreter to find out what you mean when accessing `obj.b`.

Even more sophisticated patterns of exporting and importing things via the module system are available, and we will get to those later in the book.


## Creating an HTTP server using a built-in Node.js module

For our first real Node.js application, we will use what we learned about modularization and split our code base into multiple files, which will avoid ending up with one large file full of spaghetti code.

Additionally, we will now also use internal Node.js modules. Because our mission is writing a Node.js server application that responds to HTTP requests, and because Node.js provides us with an internal module that allows to do just that, let's start on a blank canvas and create a new project folder *webserver*, with an *server.js* file that imports and uses the `http` module:

```javascript
const http = require("http");

http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello, World");
    response.end();
}).listen(8000);
```

As you can see, we declare a *const* named `http`, and assign it the value that results from calling `require("http")`, with *"http"* being the name of the internal Node.js module we want to use. In this case, it is not a file path name - it's just a name that Node.js knows how to resolve to this module. Of course, the code for the module does live in a file at the end of the day - have a look at [/lib/http.js in the Node.js GitHub repository](https://github.com/nodejs/node/blob/0f841208d2d89d91395536a3227c4b11e1bf2425/lib/http.js) if you are interested.

With this, `http` is now an object that provides the function needed to create an HTTP server - `createServer`. This function takes one parameter - a function that `createServer` will call  
whenever a client issues a new HTTP request against our server. When calling the function, `createServer` will pass two parameters, `request` and `response`. The `request` parameter is an object that provides information about the received request (but we don't use it yet). The `response` parameter is an object that provides functions which allow us to send an HTTP response to the retrieved request.

Here, we use it to set the HTTP response code to *200 OK*, set a *Content-Type* header, set the body of our response (again, a simple *"Hello, World"*), and to signal that our response is complete and shall be sent over the wire to the requesting client, via `response.end()`.

Note that `http.createServer()` alone isn't enough to build a fully working web server. `createServer()` returns an object on which we need to call the `listen()` function with a port number as the parameter, in order to bind our application to that port. This makes the operating system and in turn Node.js forward packets arriving at that port to our application.

After starting the web server application via `node server.js`, we can send HTTP requests to it - either by opening `http://127.0.0.1:8000/` in a browser, or by using the command line tool *curl*, like so:

```text
~$ > curl -v http://127.0.0.1:8000/
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 8000 (#0)
> GET / HTTP/1.1
> Host: 127.0.0.1:8000
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: text/plain
< Date: Tue, 09 Oct 2018 15:33:52 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
* Connection #0 to host 127.0.0.1 left intact
Hello, World
```

As expected, we get the string *Hello, World* as the response body, and the *Content-Type* header has been set to `text/plain`. Other headers are automatically set be the *http* module.

Let's proof that the anonymous function we passed as the parameter to `createServer` is indeed called anew every time we send an HTTP request; and while we are at it, let's include some information about the request:

```javascript
const http = require("http");

http.createServer((request, response) => {
    console.log(`Received request for ${request.url}`);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello, World");
    response.end();
}).listen(8000);
```

Stop the running application (by hitting `CTRL` + `c`), and start it again after making the change.

Sending requests to the server will now result in output on the console where the application has been started:

```text
$> curl http://127.0.0.1:8000/
$> curl http://127.0.0.1:8000/foo
$> curl http://127.0.0.1:8000/bar?a=b
```

results in

```text
$> node server.js
Received request for /
Received request for /foo
Received request for /bar?a=b
```


## Event-driven asynchronous callbacks

Let's have a closer look at what is really going on here. We pass an (anonymous) function as the parameter to another function. We already discussed this in our first "Hello, World" experiments. But there's a difference - in our experiments, we passed a function that was then immediately called. Here, at first nothing happens with the function we pass. An external event - in this case, an HTTP request - is required to make the `http` module code call our passed function.

This is a very common pattern in Node.js (and JavaScript in general). It is called the *callback pattern*, because it's like giving someone your phone number and asking them to call you back whenever they have relevant information for you.

The pattern makes obvious that a lot is going on behind the scenes to make our simple web server work. Node.js is executing the code we feed it, but it also handles events that happen outside our code.

To understand why Node.js applications have to be written this way, we need to understand how Node.js executes our code. Node's approach isn't unique, but the underlying execution model is different from runtime environments like Python, Ruby, PHP or Java.

Let's take a very simple piece of code like this:


```javascript
const result = database.query("SELECT * FROM hugetable");
console.log("Hello, World");
```

Please ignore for now that we haven't actually talked about connecting to databases before - it's just an example. The first line queries a database for lots of rows, the second line puts "Hello, World" to the console.

Let's assume that the database query is really slow, that it has to read an awful lot of rows, which takes several seconds.

The way we have written this code, the JavaScript interpreter of Node.js first has to read the complete result set from the database, and then it can execute the console.log() function.

If this piece of code actually was, say, PHP, it would work the same way: read all the results at once, then execute the next line of code. If this code would be part of an application that serves a web page, then the user would have to wait several seconds for that web page to load.

However, in the execution model of PHP, this would not become a "global" problem: the web server starts its own PHP process for every HTTP request it receives. If one of these requests results in the execution of a slow piece of code, it results in a slow page load for this particular user, but other users requesting other pages would not be affected.

The execution model of Node.js is different - there is only one single process. If there is a slow database query somewhere in this process, this affects the whole process - everything comes to a halt until the slow query has finished.

To avoid this kind of *blocking* behaviour, JavaScript, and therefore Node.js, introduces the concept of event-driven, asynchronous callbacks, by utilizing an *event loop*.

We can understand this concept by analyzing a rewritten version of our problematic code:

```javascript
let result;
database.query("SELECT * FROM hugetable", (rows) => result = rows);
console.log("Hello, World");
```

Here, instead of expecting `database.query()` to directly return a result to us, we pass it a second parameter, an anonymous function.

In its previous form, our code was *synchronous*, and therefore blocking: first do the database query, and only when this is done, then write to the console.

Now, Node.js can handle the database request asynchronously, and therefore non-blocking. Provided that `database.query()` is part of an asynchronous library, this is what Node.js does: just as before, it takes the query and sends it to the database. But instead of waiting for it to be finished, it makes a mental note that says “When at some point in the future the database server is done and sends the result of the query, then I have to execute the anonymous function that was passed to database.query()."

This way, Node.js can immediately execute `console.log()`, and afterwards, it enters the event loop. Node.js continuously cycles through this loop again and again whenever there is nothing else to do, waiting for external events. Events like, e.g., a slow database query finally delivering its results.

This also explains why our HTTP server needs a function it can call upon each incoming requests - if Node.js would start the server and then just pause, waiting for the next request, continuing only when it arrives, that would be highly inefficient. If a second user requests the server while it is still serving the first request, that second request could only be answered after the first one is done - as soon as you have more than a handful of HTTP requests per second, this wouldn't work at all.

It's important to note that this asynchronous, non-blocking, single-threaded, event-driven execution model isn't an infinitely scalable performance unicorn with silver bullets attached. It is just one of several execution models, and it has its limitations. One being that as of now, a running Node.js application is just one single operating system process and it can run on only one single CPU core.

However, this execution model is quite approachable, because it allows us to write applications that deal with concurrency in an efficient and relatively straightforward manner.

Let's play around a bit with this new concept. Can we prove that our code continues after creating the server, even if no HTTP request happened and the callback function we passed isn't called? Let's give it a try:

```javascript
const http = require("http");

http.createServer((request, response) => {
    console.log(`Received request for ${request.url}`);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello, World");
    response.end();
}).listen(8000);

console.log("Server has started.");
```

All we do here is to add another console log message at the end of our script. If it's true that `createServer().listen()` only registers the callback function for later use and immediately continues with the execution of our code, then we should immediately see the new message on the console, even if no HTTP request is handled:

```text
$> node server.js
Server has started.
```

Sure enough, this is exactly what happens - event-driven asynchronous non-blocking server-side JavaScript in action.


## Extending the application

Ok, I promised we will get back to how to organize our application. We have the code for a very basic HTTP server in file *server.js*. For now, this file *is* our application, but because the application will grow and we want to keep things tidy and organized, it's time to turn it into a module.

To do so, we need to make the server code export a function that allows us to start our HTTP server from another file:


```javascript
const http = require("http");

module.exports.start = () => {
    http.createServer((request, response) => {
        console.log(`Received request for ${request.url}`);
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello, World");
        response.end();
    }).listen(8000);

    console.log("Server has started.");
};
```

With this, we can create our main application file, *index.js*, which requires the exported function and uses it to start the web server:

```javascript
const startHttpServer = require("./server").start;

startHttpServer();
```





## Further readings

- [Node.js: exports vs module.exports](https://www.hacksparrow.com/node-js-exports-vs-module-exports.html)
- [Object initializer: New notations in ECMAScript 2015](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)
- [Felix Geisendörfer: Understanding node.js](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb)
