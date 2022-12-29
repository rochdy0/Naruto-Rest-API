import { Database } from "sqlite3";
import { resolveTypeReferenceDirective } from "typescript";

const db = new Database("db.sqlite");

export interface QueryType {
  [key: string]: any;
  character_id?: number | undefined;
  first_name?: string;
  last_name?: string;
  village?: string;
  father_name?: string;
  mother_name?: string;
}

type codeType = 200 | 201 | 400 | 404 | 500;
type errorType =
  | "OK"
  | "Created"
  | "Bad Request"
  | "Not Found"
  | "Internal Server Error";

export interface ResType {
  code: codeType;
  error: errorType;
  message?: string;
  body?: object;
}

export async function characterPost(query: QueryType): Promise<ResType> {
  let response: ResType = {} as ResType;
  for (const key in query) {
    if (!query[key]) {
      response.code = 400;
      response.error = `Bad Request`;
      response.message = `Parameter ${key} is missing`;
      return response;
    } else if (/\d/.test(query[key])) {
      response.code = 400;
      response.error = `Bad Request`;
      response.message = `Parameter ${key} cannot contain numbers`;
      return response;
    }
  }

  try {
    let exist: boolean = await new Promise(async (resolve) => {
      db.all(
        `SELECT EXISTS(SELECT first_name FROM Rest WHERE first_name=? AND last_name=?)`,
        [query.first_name, query.last_name],
        (_, res) => {
          res = res[0];
          Object.values(res)[0] === 1 ? resolve(true) : resolve(false);
        }
      );
    });
    if (exist) {
      response.code = 400;
      response.error = `Bad Request`;
      response.message = `Parameters first_name and last_name already exists`;
      return response;
    }
  } catch (err) {
    console.error(err);
    response.code = 500;
    response.error = `Internal Server Error`;
    return response;
  }

  try {
    db.run(
      `INSERT INTO Rest (first_name, last_name, village, father_name, mother_name) VALUES (?, ?, ?, ?, ?)`,
      [
        query.first_name,
        query.last_name,
        query.village,
        query.father_name,
        query.mother_name,
      ]
    );
    response.code = 201;
    response.error = `Created`;
    return response;
  } catch (err) {
    console.error(err);
    response.code = 500;
    response.error = `Internal Server Error`;
    return response;
  }
}

export async function characterGet(query: QueryType): Promise<ResType> {
  const sqlQuery: string = query.character_id
    ? `SELECT * FROM Rest WHERE character_id = ?`
    : `SELECT * FROM Rest`;
  try {
    const response: ResType = await new Promise(async (resolve) => {
      db.all(sqlQuery, [query.character_id], (_, res) => {
        if (res.length > 0) {
          resolve({ code: 200, error: "OK", body: res });
        } else {
          resolve({code: 404, error: "Not Found", message: "character not found with this id"})
        }
      });
    });
    return response;
  } catch (err) {
    console.error(err);
    const response: ResType = {
      code: 500,
      error: `Internal Server Error`,
    };
    return response;
  }
}
