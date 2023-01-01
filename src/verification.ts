import { Database } from "sqlite3";

const db = new Database("db.sqlite");

// export type villageType = "Konoha" | "Kiri" | "Kumo" | "Ame" | "Iwa" | "Oto" | "Suna";
export interface QueryType {
  [key: string]: any;
  character_id?: string;
  first_name?: string;
  last_name?: string;
  village?: string;
  father_name?: string;
  mother_name?: string;
}

type codeType = 200 | 201 | 400 | 404 | 500;
type statusType =
  | "OK"
  | "Created"
  | "Bad Request"
  | "Not Found"
  | "Internal Server Error";

export interface ResType {
  code: codeType;
  status: statusType;
  message?: string;
  body?: object;
}

const villages = new Set([
  "Konoha",
  "Kiri",
  "Kumo",
  "Ame",
  "Iwa",
  "Oto",
  "Suna",
]);

export async function characterPost(query: QueryType, jest: boolean): Promise<ResType> {
  let response: ResType = {} as ResType;
  const queryUsedType = ['first_name', 'last_name', 'village', 'father_name', 'mother_name']
  for (const key in queryUsedType) {
    if (!query[queryUsedType[key]]) {
      response.code = 400;
      response.status = `Bad Request`;
      response.message = `Parameter ${queryUsedType[key]} is missing`;
      return response;
    } else if (/[^a-zA-Z\s]/.test(query[queryUsedType[key]])) {
      response.code = 400;
      response.status = `Bad Request`;
      response.message = `Parameter ${queryUsedType[key]} can only contain letters and spaces`;
      return response;
    }
  }

  if (query.village && !villages.has(query.village)) {
    response.code = 400;
    response.status = `Bad Request`;
    response.message = `Parameter village cannot contain this value`;
    return response;
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
      response.status = `Bad Request`;
      response.message = `Parameters first_name and last_name already exists`;
      return response;
    }
  } catch (err) {
    console.error(err);
    response.code = 500;
    response.status = `Internal Server Error`;
    return response;
  }

  try {
    if (!jest)
    {
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
    }
    response.code = 201;
    response.status = `Created`;
    return response;
  } catch (err) {
    console.error(err);
    response.code = 500;
    response.status = `Internal Server Error`;
    return response;
  }
}

export async function characterGet(query: QueryType): Promise<ResType> {
  if (query.character_id === "" || query.character_id === undefined) {
    const response: ResType = {
      code: 400,
      status: "Bad Request",
      message: "character_id is missing"
    }
    return response
  }

  if (query.character_id !== undefined && /\D/.test(query.character_id)) {
    const response: ResType = {
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number",
    };
    return response;
  }

  const sqlQuery: string = `SELECT * FROM Rest WHERE character_id = ?`;

  try {
    const response: ResType = await new Promise(async (resolve) => {
        db.all(sqlQuery, [query.character_id], (_, res) => {
          if (res.length > 0) {
            resolve({ code: 200, status: "OK", body: res });
          } else {
            resolve({
              code: 404,
              status: "Not Found",
              message: "character not found with this id",
            });
          }
        });
    });
    return response;
  } catch (err) {
    console.error(err);
    const response: ResType = {
      code: 500,
      status: `Internal Server Error`,
    };
    return response;
  }
}
