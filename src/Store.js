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
      return [];
    }
  }
  deleteData(id) {
    const filteredData = this.data.filter(item => item.id !== id);
    this.updateData(filteredData);
    return this.data;
  }
  getData() {
    return this.data;
  }
  updateData(data) {
    this.data = data;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

module.exports = {
  Store
};
