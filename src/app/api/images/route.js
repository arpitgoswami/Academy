export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${process.env.UNSPLASH_API_KEY}&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
