// @ts-check

const config = {
    endpoint: "https://devices-data.documents.azure.com:443/",
    key: "vxO4DQYopYukywPrjL0oLURje9fZ7plbr8kzQPxqtyyNn1Wk3ZyozKX5DQxIcUCSuamExzAZRjox0n0eSv7LVw==",
    databaseId: "Users",
    containerId: "user",
    partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;