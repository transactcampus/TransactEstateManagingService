# Transact Estate Managing Service
The product proposal is to develop an estate manager using Azure IoT. Transact provides clients with a variety of transaction hardware devices to process retail, event, and door access transactions across hundreds of higher education campuses. In University, students use their physical ID cards to access parking lots, library, recereational services, and many more. The current problem is these IoT devices did not have a central system where they could report to. Device failures could not be monitored all the time. Transact did not have visibility to deployed devices to proactively assist clients with current or imminent device failures. Hence, the goal of this product is to solve this problem by developing an estate manager dashboard using Azure IoT services. Currently, Transact and Higher institutions who have authorized access can view their devices, errors, history and location of devices using deployed <a target="_blank" href="https://transact-estate-manager.herokuapp.com/" >website</a>.

![Transact Estate Managing Service](TEMS.gif)

Built with
* <a href="https://nodered.org/">Node Red</a> - Simulate a device and register the device in the Azure IoT Hub
* <a href="https://azure.microsoft.com/en-us/">Azure</a> - Used Azure IoT hub to register devices, function app to store data received from device into database and Cosmos DB's API for mongoDB
* <a href="https://reactjs.org/">React JS</a> - The web framework for frontend
* <a href="https://redux.js.org/">Redux JS</a> - Library used for frontend to store data
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Fetch JS</a> - Library used for fetching resources asynchronously from the defined routes
* <a href="https://nodejs.org/en/">Node JS</a> - Used for backend development with express to create server and interact with mongo DB.
* <a href="https://expressjs.com/">Express JS</a> - Used for backend server to interact with API and make http request
* <a href="https://mongoosejs.com/">Mongoose</a> - Used for creating Schema and interacting with mongo database
* <a href="https://www.mongodb.com/">Mongo DB</a> - Used for storing users data in backend

# Getting Started
1. Install the dev dependencies inside the downloaded folder
``` npm install dependencies   ```
2. ``` cd client ```
3.``` npm install dependencies ```
4. ``` cd .. ```
5. ``` npm run dev ```
6. You need to add .env file for storing your own config variables inside the downloaded folder 
* COSMOSDB_USER
* COSMOSDB_PASSWORD
* COSMOSDB_DBNAME
* COSMOSDB_HOST
* COSMOSDB_PORT
* clientID
* clientSecret
* JWT_SECRET
* PORT

# Setting Up Node Red
* <a href="https://azure.microsoft.com/en-us/blog/connecting-node-red-to-azure-iot-central/">Device Simulation in Node Red</a> - Use this link to simulate device and send data to Azure IoT Hub

# Setting Up Azure Function App
* <a href="https://docs.microsoft.com/en-us/azure/azure-functions/functions-add-output-binding-cosmos-db-vs-code?pivots=programming-language-csharp">Azure Function app example</a> - An example of function app to store data into the Cosmos DB
* <a href="https://medium.com/@avirup171/azure-iot-hub-azure-function-azure-cosmos-db-walkthrough-cc30d12d1055">Azure IoT Hub + Azure function + Azure Cosmos DB — Walkthrough</a>
* <a href="https://mongodb-documentation.readthedocs.io/en/latest/ecosystem/tutorial/use-csharp-driver.html#gsc.tab=0">CSharp Driver Tutorial</a>

# Setting Up Cosmos DB API for Mongo DB
* <a href="https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-introduction">Cosmos DB API for MongoDB</a> - Example of setting up Cosmos DB's API for Mongo DB

# License
This project is licensed under the MIT License - see the LICENSE.md file for details