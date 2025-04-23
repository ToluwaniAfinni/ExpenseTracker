export default () => ({
    // port: parseInt(process.env.PORT, 10) || 3000,
    port: 3000,
    jwt: {
      secret: process.env.JWT_SECRET || 'supersecret',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    database: {
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker',
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    },
  });