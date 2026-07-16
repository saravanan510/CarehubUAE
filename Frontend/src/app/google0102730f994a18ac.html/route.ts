export async function GET() {
  return new Response("google-site-verification: google0102730f994a18ac.html", {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
