const sql = require('mssql')

export const sqlConfig = {
  user: `${process.env.NEXT_PUBLIC_db_user}`,
  password: `${process.env.NEXT_PUBLIC_db_password}`,
  database: `${process.env.NEXT_PUBLIC_db_name}`,
  server: `${process.env.NEXT_PUBLIC_db_url}`,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

export const mssql = async ()=>{
  try {
      const pool = await sql.connect(sqlConfig)
      return pool
  } catch (error) {
      console.log('error')
  }
}