export interface QueryType {
  [key: string]: any;
  character_id?: number;
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
}

export function character_post_verification(query: QueryType): ResType {
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
  response.code = 201;
  response.error = `Created`;
  return response;
}
