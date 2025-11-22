import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Edge Runtime requires a remote URL (libsql://, https://, wss://)
// Cannot use file:// URLs in Cloudflare Workers/Pages
// Lazy initialization to avoid build-time errors
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDb() {
    if (!_db) {
        const url = process.env.TURSO_DATABASE_URL;
        const authToken = process.env.TURSO_AUTH_TOKEN;

        if (!url) {
            throw new Error('TURSO_DATABASE_URL environment variable is required');
        }

        const client = createClient({
            url,
            authToken,
        });

        _db = drizzle(client, { schema });
    }

    return _db;
}

// Export a proxy that lazily initializes
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
    get(_target, prop) {
        return (getDb() as any)[prop];
    }
});

// Backwards compatibility
export const prisma = db;
export default db;
