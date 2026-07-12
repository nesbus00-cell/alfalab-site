const FIREBASE_URL = "https://ellmoktam-3030e-default-rtdb.firebaseio.com/alfaLabDatabase.json";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === '/api/labdata') {
            if (request.method === 'POST') {
                const body = await request.text();
                const res = await fetch(FIREBASE_URL, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: body
                });
                return new Response(await res.text(), {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            } else {
                const res = await fetch(FIREBASE_URL);
                return new Response(await res.text(), {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 'no-store'
                    }
                });
            }
        }

        return env.ASSETS.fetch(request);
    }
};
