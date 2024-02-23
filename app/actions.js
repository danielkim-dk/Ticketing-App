"use server";

const { revalidatePath } = require("next/cache");
const postgres = require("postgres");
const { z } = require("zod");

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL, {
  ssl: "allow",
});

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

async function createTodo(prevState, formData) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  try {
    await sql`
      INSERT INTO todos (text)
      VALUES (${data.todo})
    `;

    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

async function deleteTodo(prevState, formData) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    await sql`
      DELETE FROM todos
      WHERE id = ${data.id};
    `;

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}

module.exports = {
  createTodo,
  deleteTodo,
};