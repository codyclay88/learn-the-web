// This is a simple TCP server that listens on port 8824 and sends "Hello World" to the client.

// The server is written in TypeScript and uses the Deno runtime.

const listener = Deno.listen({ port: 8824, transport: "tcp" });

for await (const conn of listener) {

  const buf = new Uint8Array(1024);

  console.log("Reading request data...");
  const bytesRead = await conn.read(buf);

  console.log(bytesRead);

  const request = new TextDecoder().decode(buf);
  console.log(request);

  console.log("Request received... sending response");

  const body = "Hello World";

  const responseMessage = `HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: ${body.length}

${body}
  `;

  console.log(responseMessage);

  await conn.write(new TextEncoder().encode(responseMessage));

  conn.close();
}
