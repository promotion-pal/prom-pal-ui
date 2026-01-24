import z from "zod";

const promSchemaPhone = z.string().regex(/^\+7\d{10}$/, {
  message: "Номер должен быть в формате +7XXXXXXXXXX (11 цифр)",
});
export { promSchemaPhone };
