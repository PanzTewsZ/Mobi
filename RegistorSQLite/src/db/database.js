import * as Crypto from "expo-crypto";

export const DATABASE_NAME = 'registor_db.db'

export async function initDb(db) {
    

    await db.execAsync(`
        PRAGMA jornal_mode = WAL;

        CREAT TABLE IF NOT EXISTS student(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name            TEXT NOT NULL, 
            surname         TEXT NOT NULL, 
            student_id      TEXT NOT NULL UNIQUE,
            username        TEXT NOT NULL UNIQUE,
            password_salt   TEXT NOT NULL,
            password_hash   TEXT NOT NULL,
            created_at      TEXT NOT NULL,
        );
    `)
}