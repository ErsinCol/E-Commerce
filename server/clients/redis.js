import {createClient} from "redis";

export const client = createClient();

client.on("error", err => console.error("Redis client error: ", err));

await client.connect();