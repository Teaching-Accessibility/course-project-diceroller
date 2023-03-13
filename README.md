# Diceability

## Group

- John Bomann
  - R1
    - Set up github project and boilerplate
    - Created home navigation page, implemented navigation
    - Partially set up rollParser
    - Created simple roller page UI, implemented some features
    - Created advanced roller page UI, implemented some features
    - Created profile context hook for use throughout project, since a lot of the components are dependent on the profile's configurations
  - R2
    - Implemented swipe gestures on Simple Roller
    - Updated entire UI to follow Material Design standards, using react-native-paper
    - Changed navigation to use bottom navigation instead of dashboard navigation
    - Finished functionality for Simple Roller
    - Replaced Advanced Roller with Saved Roller, which uses saved rolls
    - Implemented profile adding, configuration, and context switching on Profiles page
      - Functionality for adding/removing dice
      - Functionality for adding/removing saved rolls
      - Created preset profiles for common game systems
    - Implemented History
- Ian Donovan
  - Integrated the dice-roller-parser library by btmorton
  - Implemented rollPraser to work with complex strings, only works for simple roller for now
  - Simple roller displays groups results seperated by die type
  - Collected accessible color schemes and silhouette icons for dice buttons
  - Added error handeling and reformatted query inputs
  - Lots of small visibility tweaks on the main simple roller page
  - Led evaluation planning and shared reporting

## Features

R1:
- Navigation between pages, only a single layer deep for each tab, navigate to other tabs through the base Dashboard
- Profile Context lets profile settings be shared across the application
- Simple Roller, for simple roll queries, minimal modifiers. It displays each individual dice roll
- Advanced Roller, for more complex rolling. Displays commonly used saved rolls, allows for wider range of dice available, in addition to more  modifiers. Uses native keyboard instead of buttons.

R2:
- Completely functional Simple Roller with support for all polyhedral dice types.
- Accessible, non-positional gesture controls.
- History page that automatically saves a list of previous rolls.
- Profiles that can be edited and applied to the main roller page to customize die choices.
- Screen reader and colorblind support

## Installation

#### A bit hard to set up

1. Clone github
2. Run `npm install` inside root folder
3. Follow the instructions [here](https://reactnative.dev/docs/environment-setup), using React Native CLI Quickstart. We used Windows as the development OS and Android as the main focus. Ignore the "Creating a new application" section.
4. Run `npm start run-android`, press 'a' for android
5. You should be able to view the application in an emulator

## Future Work:

Result announcer

## UI Documentation

https://docs.google.com/document/d/1ntAumqhYySYGAjMpAh8x-abYyZba5t_hqrwpbHL9Pcc/edit?usp=sharing

