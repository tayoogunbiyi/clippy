const Application = require("spectron").Application;
const assert = require("assert");
const electronPath = require("electron"); // Require Electron from the binaries included in node_modules.
const path = require("path");

describe("Application launch", function() {
  this.timeout(10000);

  beforeEach(() => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, "..")]
    });
    return this.app.start();
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("Shows an initial window", () => {
    return this.app.client
      .getWindowCount()
      .then(count => assert.equal(count, 1));
  });

  it("Has an application title of 'Clippy'", () => {
    return this.app.client
      .getTitle()
      .then(title => assert.equal(title, "Clippy"));
  });
});
