import { characterGet } from "../src/verification";

describe("Function that verifies the parameters and return sql row if everything is right", () => {
  test("Give 1 to character_id and get the correct row", async () => {
    const daa = await characterGet({ character_id: '1' });
    expect(daa).toEqual({
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
    const daa = await characterGet({});
    expect(daa).toEqual({
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
          }
      ],
    });
  });
  test("Give 'a' to character_id to get an error ", async () => {
    const daa = await characterGet({character_id: 'a'});
    expect(daa).toEqual({
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number"   
    });
  });
  test("Give '%' to character_id to get an error ", async () => {
    const daa = await characterGet({character_id: '%'});
    expect(daa).toEqual({
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number"   
    });
  });
  test("Give '%' to character_id to get an error ", async () => {
    const daa = await characterGet({character_id: '%'});
    expect(daa).toEqual({
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number"   
    });
  });
  test("Give 'µ1' to character_id to get an error ", async () => {
    const daa = await characterGet({character_id: 'µ1'});
    expect(daa).toEqual({
      code: 400,
      status: "Bad Request",
      message: "character_id must be a number"   
    });
  });
});