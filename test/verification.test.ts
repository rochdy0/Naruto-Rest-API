import { characterGet, characterPost } from "../src/verification";

describe("Function that verifies the parameter character_id and return HTTP code with sql row if everything is right", () => {
  test("Give 1 to character_id and get the correct row", async () => {
    const data = await characterGet({ character_id: "1" });
    expect(data).toEqual({
      code: 200,
      status: "OK",
      body: [
        {
          character_id: 1,
          first_name: "Naruto",
          last_name: "Uzumaki",
          village: "Konoha",
          father_name: "Minato Namikaze",
          mother_name: "Kushina Uzumaki",
        },
      ],
    });
  });
  test("Give no parameters and get all rows", async () => {
    const data = await characterGet({});
    expect(data).toEqual({
      code: 200,
      status: "OK",
      body: [
        {
          character_id: 1,
          first_name: "Naruto",
          last_name: "Uzumaki",
          village: "Konoha",
          father_name: "Minato Namikaze",
          mother_name: "Kushina Uzumaki",
        },
        {
          character_id: 2,
          first_name: "Sakura",
          last_name: "Haruno",
          village: "Konoha",
          father_name: "Kizashi Haruno",
          mother_name: "Mebuki Haruno",
        },
      ],
    });
  });
  test("Give '' parameter and get all rows", async () => {
    const data = await characterGet({ character_id: "" });
    expect(data).toEqual({
      code: 200,
      status: "OK",
      body: [
        {
          character_id: 1,
          first_name: "Naruto",
          last_name: "Uzumaki",
          village: "Konoha",
          father_name: "Minato Namikaze",
          mother_name: "Kushina Uzumaki",
        },
        {
          character_id: 2,
          first_name: "Sakura",
          last_name: "Haruno",
          village: "Konoha",
          father_name: "Kizashi Haruno",
          mother_name: "Mebuki Haruno",
        },
      ],
    });
  });
  test("Give 'a' to character_id to get an error ", async () => {
    const data = await characterGet({ character_id: "a" });
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number",
    });
  });
  test("Give '%' to character_id to get an error ", async () => {
    const data = await characterGet({ character_id: "%" });
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number",
    });
  });
  test("Give '%' to character_id to get an error ", async () => {
    const data = await characterGet({ character_id: "%" });
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number",
    });
  });
  test("Give 'µ1' to character_id to get an error ", async () => {
    const data = await characterGet({ character_id: "µ1" });
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number",
    });
  });
});

describe("Function that verifies the parameters and return HTTP code if everything is right or not", () => {
  test("Give correct parameters ", async () => {
    const data = await characterPost(
      {
        first_name: "Sasuke",
        last_name: "Uchiwa",
        village: "Konoha",
        father_name: "Fugaku Uchiwa",
        mother_name: "Mikoto Uchiwa",
      },
      true
    );
    expect(data).toEqual({
      code: 201,
      status: "Created",
    });
  });
  test("Give correct parameters but in an other order", async () => {
    const data = await characterPost(
      {
        village: "Konoha",
        father_name: "Fugaku Uchiwa",
        first_name: "Sasuke",
        mother_name: "Mikoto Uchiwa",
        last_name: "Uchiwa",
      },
      true
    );
    expect(data).toEqual({
      code: 201,
      status: "Created",
    });
  });
  test("Give parameters that already exists", async () => {
    const data = await characterPost(
      {
        first_name: "Naruto",
        last_name: "Uzumaki",
        village: "Konoha",
        father_name: "Minato Namikaze",
        mother_name: "Kushina Uzumaki",
      },
      true
    );
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "Parameters first_name and last_name already exists"
    });
  });
  test("Give correct parameters except first_name who's equal to '' ", async () => {
    const data = await characterPost(
      {
        first_name: '',
        last_name: "Uchiwa",
        village: "Konoha",
        father_name: "Fugaku Uchiwa",
        mother_name: "Mikoto Uchiwa",
      },
      true
    );
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "Parameter first_name is missing"
    });
  });
  test("Give correct parameters except first_name who's missing", async () => {
    const data = await characterPost(
      {
        last_name: "Uchiwa",
        village: "Konoha",
        father_name: "Fugaku Uchiwa",
        mother_name: "Mikoto Uchiwa",
      },
      true
    );
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "Parameter first_name is missing"
    });
  });
  test("Give correct parameters except first_name who's equal to undefined", async () => {
    const data = await characterPost(
      {
        first_name: undefined,
        last_name: "Uchiwa",
        village: "Konoha",
        father_name: "Fugaku Uchiwa",
        mother_name: "Mikoto Uchiwa",
      },
      true
    );
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "Parameter first_name is missing"
    });
  });
  test("Give correct parameters except first_name contain numbers", async () => {
    const data = await characterPost(
      {
        first_name: "Sasuke1",
        last_name: "Uchiwa",
        village: "Konoha",
        father_name: "Fugaku Uchiwa",
        mother_name: "Mikoto Uchiwa",
      },
      true
    );
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "Parameter first_name can only contain letters and spaces"
    });
  });
  test("Give correct parameters except first_name contain special caracters", async () => {
    const data = await characterPost(
      {
        first_name: "Sasuke%",
        last_name: "Uchiwa",
        village: "Konoha",
        father_name: "Fugaku Uchiwa",
        mother_name: "Mikoto Uchiwa",
      },
      true
    );
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "Parameter first_name can only contain letters and spaces"
    });
  });
  test("Give 'Test' to village", async () => {
    const data = await characterPost(
      {
        first_name: "Sasuke",
        last_name: "Uchiwa",
        village: "Test",
        father_name: "Fugaku Uchiwa",
        mother_name: "Mikoto Uchiwa",
      },
      true
    );
    expect(data).toEqual({
      code: 400,
      status: "Bad Request",
      message: "Parameter village cannot contain this value"
    });
  });
});
