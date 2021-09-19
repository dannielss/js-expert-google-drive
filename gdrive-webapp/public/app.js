import AppControler from "./src/appController.js";
import ConnectionManager from "./src/connectionManager.js";
import DragAndDropManager from "./src/dragAndDropManager.js";
import ViewManager from "./src/viewManager.js";

const API_URL = "http://localhost:3000"

const appController = new AppControler({
  viewManager: new ViewManager(),
  dragAndDropManager: new DragAndDropManager(),
  connectionManager: new ConnectionManager({
    apiUrl: API_URL
  })
})

try {
  await appController.initialize()
} catch( error ) {
  console.error('error on initializing', error)
}
