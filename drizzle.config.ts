import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    schema: './lib/db/schema.ts',
    out: './drizzle',
    driver: 'turso',
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL || 'file:local.db',
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
} satisfies Config;
