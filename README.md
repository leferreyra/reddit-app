
Reddit Inbox
============

A simple application for browsing the top posts list of Reddit's homepage.

*Check out the running application on https://reddit-inbox.web.app*

## Running

To run the application locally just check out the repository and run

```
yarn && yarn start
```

## Deploy

The production application is hosted using Firebase hosting. To deploy run

```
firebase deploy
```
*You must have firebase-tools package installed*.

## Desicions

### Testing

Right off the bat, given the project's scope and available time, plus the fact that testing is not mentioned in the assignment, I chose to leave all sorts of automated testing out of scope. By ensuring feature quality manually, we free some more time for feature development.

### Bootstraping

The project was bootstrapped using the tool `create-react-app`. Specifically the `redux` template.
This template uses some very sensible environment setup and defaults. And I chose to go mostly with the template's because it would be faster. Environment settups may take lots of time to have perfect.

### Tools and libraries

#### UI

For the UI, I used React.js, of course. I used the rather new Hooks syntax, just for preference.

#### State management

For the app's state management I used redux (as it was specified in the assignment, if it was up to me I wouldn't have included it since its a very small project to justify it).
I also used the Redux Toolkit which is a set of utilities and packages that the Redux team has put together that covers the most basic Redux usecases. I haven't used it before, but its pretty cool.

#### Styles

The bootstrapped project had plain CSS modules configured. So I just used plain CSS modules as it is.

#### react-time-ago

I used a couple of third party components, to speed up development. One of them is `react-time-ago` which is a component that turns a date object into a human friendly relative time string. It has different locales to choose from, very configurable and flexible.

#### axios

For making requests, I chose `axios`. Mostly because I'm very familiar with it.

#### lodash

I included a lodash function. The `last` function, picks the last element of an array. Because the way to do it in plain javascript is so ugly.

#### use-debounce

I included a package that provides a react hook to debounce stuff. Never used it before, but its simple and it works.

#### react-router-dom

Of course, the default package for routing in reactland. Not to much to say about that. It's my go to routing for react.

#### Infinite Loading

I tried different packages to implement the infinite scrolling of the post list, but none really worked as I wanted, or they lacked configuration options. So I just coded it from scratch.

#### Animations

I used the `react-transition-group` to manage the component's transitions. Its the default solution for react animations.

