const electron = require("electron");
const path = require("path");
const fs = require("fs");

class Store {
  constructor({ name }) {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );
    this.path = path.join(userDataPath, name + ".json");
    this.data = this.parseDataFile(this.path);
  }
  parseDataFile(filePath) {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      // go ahead to create file if file doesn't exist yet
      console.log("Creating file @", filePath);
      fs.writeFileSync(filePath, JSON.stringify([]));
      return {};
    }
  }
  getData() {
    return this.data;
  }
}

module.exports = {
  Store
};
