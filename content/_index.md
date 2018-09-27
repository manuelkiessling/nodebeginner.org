---
title: Home
menu: main
weight: -270
---

# Preface

## About

Welcome to **The Node.js and React Beginner Book**. The aim of this book is to teach you everything you need to know to build full-blown web applications that are useful, reliable, and fast, using modern JavaScript features and tools.

We will start with the basics and build on these step-by-step. Everything is explained in detail and taught at just the right pace, making sure that everything sticks and can be understood easily.

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
~$> node -v
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
~$> node helloworld.js

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
~$> node helloworld.js

42
```

Mh... let's get a little crazy. What if we try to print out an object? The only object we know so far is `console` itself, so let's try to print that:

```javascript
console.log("Hello, World");
```

```text
~$> node helloworld.js

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
var v = "this is var";

let l = "this is let";

const c = "this is const";

console.log(v);
console.log(l);
console.log(c);


v = "this is var, changed";

l = "this is let, changed";

c = "this is c, changed";

console.log(v);
console.log(l);
console.log(c);
```

```text
~$> node helloworld.js

this is var
this is let
this is const

/Users/manuelkiessling/helloworld.js:19

c = "this is c, changed";
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
~$> node helloworld.js

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
~$> node helloworld.js

{}
/Users/manuelkiessling/helloworld.js:5

myObject = { info: "this object has been changed" };
         ^
TypeError: Assignment to constant variable.
```

My recommendation regarding the use *var*, *let* and *const* is as follows:

- Never use *var*, because it doesn't give you anything useful in comparison to *let*, except for some irritating scope issues. The main reason that *var* is still part of the language is to avoid breaking old code.

- Use *const* whenever possible, because it protects you from accidentally reassigning values to variables, which can prevent several types of subtle bugs in your code.

- Use *let* when you know that you really want to reassign values. You will see that this surprisingly seldom is the case.


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
~$> node helloworld.js

For your consideration: Hello, World
```

Just like we called the `log` function on `console` before, we can now call a function `log` on our own `politeConsole` (which in turn calls `console.log`` of course).

This code can be improved, though. We already saw that Node.js supports the ES6 language version of JavaScript, which gives us *let* and *const*. It also allows to write function declarations more succinctly, and instead of concatenating strings with the `+` operator, we can use string templates using the backtick operator `` ` ``:

```javascript
const politeConsole = {
  log: (text) => console.log(`For your consideration: ${text}`)
};

politeConsole.log("Hello, World");
```

Let's now take a look at something that is not typically possible or commonly done in "conventional" languages like PHP or Java, but is very natural in JavaScript.

Assume that while we want our keep our politeConsole object in charge of actually printing text to the console, we want more freedom regarding the "layouting" of the text that is written out.

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
For your consideration: " + text
```
