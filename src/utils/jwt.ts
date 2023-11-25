import { promisify } from 'util';
import {env} from 'node:process'
import jsonwebtoken from "jsonwebtoken";

const pverify = promisify(jsonwebtoken.verify);

export async function createToken(data: { id: number, name: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign({data}, env.SECRET as string, {
      expiresIn: env.EXPIRE,
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      if (!result) {
        return reject('token is null')
      }
      resolve(result)
    })
  })
}