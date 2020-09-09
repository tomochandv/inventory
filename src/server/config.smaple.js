const config = {
  db: {
    staging: {
      host: 'localhost',
      port: 3306,
      user: 'user',
      password: '1111',
      database: 'inventory',
      multipleStatements: true,
    },
    local: {
      host: '192.168.123.169',
      port: 3306,
      user: 'user',
      password: '1111',
      database: 'inventory',
      multipleStatements: true,
    },
  },
  siteUrl: {
    local: 'http://localhost:4010',
    staging: '',
  },
}

export default config
