import { createConnection } from 'typeorm';
import { DATABASE_CONFIG } from '../config/database.config';

export const databaseProviders = [
    {
        provide: 'DbConnection',
        useFactory: async () => {
            return await createConnection({
                type: DATABASE_CONFIG.dialect,
                host: DATABASE_CONFIG.host,
                port: DATABASE_CONFIG.port,
                username: DATABASE_CONFIG.username,
                password: DATABASE_CONFIG.password,
                database: DATABASE_CONFIG.database,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                /**
                 * Actually clean/remove some properties during sync.
                 * synchronize: true => DEVELOPMENT ONLY
                 */
                synchronize: true,
                logging: (process.env.NODE_ENV !== 'production'),
                logger: 'advanced-console',
            });
        },
    },
];
