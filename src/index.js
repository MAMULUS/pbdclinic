export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const method = request.method;

        if (url.pathname === "/api/patients" && method === "POST") {
            return handleRegisterPatient(request, env);
        }

        if (url.pathname.startsWith("/api/patients/") && method === "GET") {
            const id = url.pathname.split("/")[3];
            return handleGetPatient(id, env);
        }

        if (url.pathname === "/api/appointments" && method === "POST") {
            return handleCreateAppointment(request, env);
        }

        if (url.pathname.startsWith("/api/appointments/") && method === "GET") {
            const id = url.pathname.split("/")[3];
            return handleGetAppointment(id, env);
        }

        return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }
};

function generateId() {
    return crypto.randomUUID();
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}

async function handleRegisterPatient(request, env) {
    const body = await request.json();
    if (!body.consent || body.consent !== true) {
        return jsonResponse({ error: "Consent required" }, 400);
    }
    const id = generateId();
    const created_at = new Date().toISOString();
    await env.pbdclinic_db.prepare(
        "INSERT INTO patients (id, consent, created_at) VALUES (?, ?, ?)"
    ).bind(id, 1, created_at).run();
    return jsonResponse({ id, created_at }, 201);
}

async function handleGetPatient(id, env) {
    const result = await env.pbdclinic_db.prepare(
        "SELECT id, consent, created_at FROM patients WHERE id = ?"
    ).bind(id).first();
    if (!result) {
        return jsonResponse({ error: "Patient not found" }, 404);
    }
    return jsonResponse(result);
}

async function handleCreateAppointment(request, env) {
    const body = await request.json();
    if (!body.patient_id || !body.reason || !body.scheduled_at) {
        return jsonResponse({ error: "Missing required fields" }, 400);
    }
    const patient = await env.pbdclinic_db.prepare(
        "SELECT id FROM patients WHERE id = ?"
    ).bind(body.patient_id).first();
    if (!patient) {
        return jsonResponse({ error: "Patient not found" }, 404);
    }
    const id = generateId();
    const created_at = new Date().toISOString();
    await env.pbdclinic_db.prepare(
        "INSERT INTO appointments (id, patient_id, reason, scheduled_at, created_at) VALUES (?, ?, ?, ?, ?)"
    ).bind(id, body.patient_id, body.reason, body.scheduled_at, created_at).run();
    return jsonResponse({ id, created_at }, 201);
}

async function handleGetAppointment(id, env) {
    const result = await env.pbdclinic_db.prepare(
        "SELECT id, patient_id, reason, scheduled_at, created_at FROM appointments WHERE id = ?"
    ).bind(id).first();
    if (!result) {
        return jsonResponse({ error: "Appointment not found" }, 404);
    }
    return jsonResponse(result);
}