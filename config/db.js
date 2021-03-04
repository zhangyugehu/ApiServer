const PWD = 'u-notification'
const DB_NAME = 'test'
// const CONNECTION_URL = `mongodb+srv://u-notification:${PWD}@cluster0.ntqve.azure.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
// const CONNECTION_URL = 'mongodb://u-notification:u-notification@cluster0-shard-00-00-ntqve.azure.mongodb.net:27017,cluster0-shard-00-01-ntqve.azure.mongodb.net:27017,cluster0-shard-00-02-ntqve.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

const CONNECTION_URL = `mongodb://nas.thssh.com:27017/${DB_NAME}`

const DBTables = {
    NOTE: 'notes',
    ACCOUNTING: 't_accounting',
    TOKEN: 't_token',
    USER: 't_user',
    CLIPBOARD: 't_clipboard',
    MONEY: 't_money',
}

module.exports = {
    url : CONNECTION_URL,
    DBTables
};