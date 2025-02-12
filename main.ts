// Let's build a web server that listens on port 3000 and returns a simple message to the client.

const serverOptions: Deno.ServeTcpOptions = {
  port: 8824,
};

Deno.serve(serverOptions, (req) => {
  console.log(req);

  const html =
    `<html lang="en"><head><title>Learn the Web</title></head><body><h1>Hello, Deno!</h1></body></html>`;
  const response = new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });

  console.log(response);

  return response;
});
