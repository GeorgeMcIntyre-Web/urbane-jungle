import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Edge Runtime requires a remote URL (libsql://, https://, wss://)
// Cannot use file:// URLs in Cloudflare Workers/Pages
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
    url,
    authToken,
});

const db = drizzle(client, { schema });

// Named exports
export { db };
export { db as prisma };

// Default export
export default db;
