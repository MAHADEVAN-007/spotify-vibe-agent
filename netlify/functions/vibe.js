exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://automationid1.app.n8n.cloud/webhook/vibe-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-key': 'spotify@vibe@n8n_workflow'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Proxy error', message: err.message })
    };
  }
};
