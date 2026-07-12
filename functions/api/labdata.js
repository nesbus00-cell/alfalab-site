// دالة "وسيطة" شغالة على سيرفرات كلاود فلير نفسها.
// المتصفح (حتى لو في شبكة بتحجب Firebase) بيكلم بس دومين الموقع.
// كلاود فلير من عنده هو اللي بيوصل فعليًا لـ Firebase وبيرجع البيانات.

const FIREBASE_URL = "https://ellmoktam-3030e-default-rtdb.firebaseio.com/alfaLabDatabase.json";

export async function onRequestGet(context) {
    try {
        const res = await fetch(FIREBASE_URL, { cf: { cacheTtl: 0 } });
        const data = await res.text();
        return new Response(data, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
    }
}

export async function onRequestPost(context) {
    try {
        const body = await context.request.text();
        const res = await fetch(FIREBASE_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
        const result = await res.text();
        return new Response(result, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
    }
}
