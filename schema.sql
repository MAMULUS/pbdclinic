CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    consent INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    scheduled_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);