const CONNECTION_URL = 'mongodb://u-notification:u-notification@cluster0-shard-00-00-ntqve.azure.mongodb.net:27017,cluster0-shard-00-01-ntqve.azure.mongodb.net:27017,cluster0-shard-00-02-ntqve.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

const DBTables = {
    NOTE: 'notes',
    ACCOUNTING: 't_accounting',
    TOKEN: 't_token',
    USER: 't_user',
    CLIPBOARD: 't_clipboard'
}

module.exports = {
    url : CONNECTION_URL,
    DBTables
};