import { OkPacket } from "mysql";
import ErrorModel from "../03-models/error-model";
import ProductModel from "../03-models/product-model";
import dal from "../04-dal/dal";


//פונ' זו מקבלת את 2 הפרמטרים האלו ומכניסה אותם לדאטה בייס
async function addFollow(userId: string, vacationId: number): Promise<number> {

  let sql = `INSERT INTO followers (userId , vacationId) 
    VALUES (?,?);`;
  let parameters = [userId, vacationId];

  const info: OkPacket = await dal.execute(sql, parameters);
  const id = info.insertId;
  return id;
}

//פונ' זו מקבלת את 2 הפרמטרים האלו ומוחקת אותם מהדאטה בייס
async function unFollow(userId: string, vacationId: number): Promise<void> {

  let sql = `DELETE FROM followers WHERE userId=? AND vacationId=?; `;
  let parameters = [userId, vacationId];

  await dal.execute(sql, parameters);
  return;
}


export default {
  addFollow,
  unFollow
};
