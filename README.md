# Personal site made with Scully, Tailwind and ng16

This project is my personal site, which contains my blog. It was made with [Scully](https://scully.io/), [Tailwind](https://tailwindcss.com/docs/installation) and Angular v16.
Inspired and based on [Nelson's blog](https://github.com/nelsongutidev)

## Development server

To run the angular app, run `ng serve`. App will be served on port:4200.

## Scully server

To run the scully server locally, do the following:

1. `ng build`
2. `npm run scully`
3. `npm run scully:serve`

Visit port 1668

Any change on the angular app needs a new ng build for the scully server to pick up.

## Changes to Blog page

If you create a new .md file or updated it, make sure you run `npm run scully -- --scanRoutes` so that scully can find the new routes and add them.
Or run `npm run build:ci`.

## Can I use this project

Feel free to use this code. Create your own blog, or your own site and style it however you like and ship it 🚀. Just try to make it your own 😉.

## Angular CLI Explorer

This project contains an Angular CLI Explorer, which constructs the desired CLI command after selecting from the available options.
