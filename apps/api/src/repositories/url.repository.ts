import { pool } from "../db";
import { encodeBase62 } from "../utils/base62";

export async function createUrl(originalUrl: string) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const sequenceResult = await client.query(
      "SELECT nextval('urls_id_seq') AS id"
    );

    const id = sequenceResult.rows[0].id as string;

    const slug = encodeBase62(BigInt(id));

    const result = await client.query(
      `
      INSERT INTO urls (id, slug, original_url)
      VALUES ($1, $2, $3)
      RETURNING id, slug, original_url, created_at
      `,
      [id, slug, originalUrl]
    );

    await client.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
