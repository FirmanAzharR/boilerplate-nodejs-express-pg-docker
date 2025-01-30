const Postgres = require("../../../libraries")("Postgres");
const postgres = Postgres.getInstance().conn;
const { buildUpdateQueryPS2, buildInsertQueryPS, buildSearchQuery  } = require("../../../helper")("database");

module.exports = {
  checkUser: async (username) => {
    try {
      let sql = `
           select * from public.users where username = $1 AND status_code = 'ACTIVE'
       `;
      let result = await postgres.any(sql, [username]);
      return result;
    } catch (e) {
      console.log(e)
      return false;
    }
  },
  getAllUser: async (data, limit, offset) => {
    try {
      const where = buildSearchQuery(data)
      const sql = `select username, last_login, login_status from public.users ${where} offset ${offset} limit ${limit}`
      console.log(sql)

      let result = await postgres.any(sql);
      return result;
    } catch (e) {
      console.log('search',e)
      return false;
    }
  },
  countAllUSer: async () => {
    try {
      let sql = `
           select count(*) from public.users where status_code = 'ACTIVE'
       `;
      let result = await postgres.one(sql);
      return result;
    } catch (e) {
      console.log(e)
      return false;
    }
  },
  upldateLoginStatus: async (data) =>{
    try {
      await postgres.tx(async (trx) => {
        let buildUpdate = buildUpdateQueryPS2(
          "users",
          data.data,
          data.condition,
          'status_code'
        );
        await trx.one(buildUpdate.query, buildUpdate.data);
      });

      return true;
    } catch (err) {
      console.log("update password", err);
      return false;
    }
  },
  //no return data
  // registerUser: async (data) =>{
  //   try{
  //       await postgres.tx(async(trx)=>{
  //       const builQuery = buildInsertQueryPS("users", [data]);
  //       console.log(builQuery)
  //       trx.one(builQuery.query, builQuery.data);
  //     })
  //   }catch(err){
  //     console.log("register user error", err);
  //     return false
  //   }
  // },
  registerUser: async (data) =>{
    try{
     return await postgres.tx(async(trx)=>{
        const builQuery = buildInsertQueryPS("users", [data]);
        // console.log(builQuery)
         return trx.one(builQuery.query, builQuery.data);
      })
    }catch(err){
      console.log("register user error", err);
      return false
    }
  },
  updatePwd: async (data) => {
    try {
      await postgres.tx(async (trx) => {
        let buildUpdate = buildUpdateQueryPS2(
          "users",
          data.account,
          data.accountCondition
        );
        
        await trx.any(buildUpdate.query, buildUpdate.data);
      });

      return true;
    } catch (err) {
      console.log("update password", err);
      return false;
    }
  },
  updateImg: async (data) => {
    console.log(data)
    try {
      await postgres.tx(async (trx) => {
        let buildUpdate = buildUpdateQueryPS2(
          "users",
          data.updateImg,
          data.accountCondition
        );

        console.log(buildUpdate)
        
        await trx.any(buildUpdate.query, buildUpdate.data);
      });

      return true;
    } catch (err) {
      console.log("update image", err);
      return false;
    }
  },
};
