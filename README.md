# Diceability

## Group

- John Bomann
  - Set up github project and boilerplate
  - Created home navigation page, implemented navigation
  - Partially set up rollParser
  - Created simple roller page UI, implemented some features
  - Created advanced roller page UI, implemented some features
  - Created profile context hook for use throughout project, since a lot of the components are dependent on the profile's configurations
- Ian Donovan
  - included the dice-roller-parser library by btmorton
  - implemented rollPraser to work with complex strings, only works for simple roller for now
  - simple roller displays groups results seperated by die type

## Features

- Navigation between pages, only a single layer deep for each tab, navigate to other tabs through the base Dashboard
- Profile Context lets profile settings be shared across the application
- Simple Roller, for simple roll queries, minimal modifiers. It displays each individual dice roll
- Advanced Roller, for more complex rolling. Displays commonly used saved rolls, allows for wider range of dice available, in addition to more modifiers. Uses native keyboard instead of buttons.

## Installation

#### A bit hard to set up

1. Clone github
2. Run `npm install` inside root folder
3. Follow the instructions [here](https://reactnative.dev/docs/environment-setup), using React Native CLI Quickstart. We used Windows as the development OS and Android as the main focus. Ignore the "Creating a new application" section.
4. Run `npm start run-android`, press 'a' for android
5. You should be able to view the application in an emulator

## To-Do

- Implement rollParser
- Implement history

## Potential Features

- Swiping horizontally on the Result box will open history

## UI Documentation

This seems like the easiest way to share images
https://docs.google.com/document/d/1wTtnnku08BUEh8jqhA4uANRJlab9ikZGfmmSNdpyC2k/edit?usp=sharing
