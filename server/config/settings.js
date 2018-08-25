module.exports = {
    jwtSecret: process.env.JWT_SECRET || process.env.JWT_SECRET_DEV,
    dbUri: process.env.MONGODB_URI || process.env.DB_URI
};