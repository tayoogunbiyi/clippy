# Clippy

[![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRSJ-i4aISVUd342bOugA0ub5cuslwj_4LLM83A11Tym__-jGTDA)](https://electronjs.org/)

Clippy is a desktop application that helps keep track of your clipboard history.

- Simple UI
- Built with Javascript (Electron and React)
- Search through your clipboard history
- Night mode 🌑

# Coming Features

- Search by date
- Keep track of images copied to the clipboard
- Auto launch on start of computer

### To do

- Add loading screen
- Integration and Unit tests with spectron, jest.

### Installation

Clippy requires [Node.js](https://nodejs.org/) installed to run.

After cloning the repo, Install the dependencies and start the application.

```sh
$ cd clippy
$ npm install
$ npm run start
```

The `npm run start` command has been modified to start the electron app and then start the react application after the electron app has been launched.
You might need to refresh the electron application by `Ctrl+R` once the react application is started.
