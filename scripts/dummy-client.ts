// Here we are simulating a web browser by sending an HTTP request to a server.
// The code for the server is in main.ts, and can be started by running `deno task dev` in the terminal.

const httpRequestString = `GET / HTTP/1.1
User-Agent: Mozilla/5.0
Accept: text/html
Connection: close
\r\n\r\n
`;
// The above string is an HTTP request that we will send to the server.
// It is a simple GET request for the root path `/` of the server.

// The double carriage return and line feed `\r\n\r\n` at the end of the request indicate the end of the request.
// Without this the server will not know when the request is complete, and therefore a response will not be sent.

// Also, the "Connection: close" header tells the server to close the connection after sending the response.
// I was not able to get a response from the server without this header.

const httpRequest = new TextEncoder().encode(httpRequestString);

const conn = await Deno.connect({ port: 8824 });

await conn.write(httpRequest);

const buf = new Uint8Array(2048);

while (true) {
  const bytesRead = await conn.read(buf);
  if (!bytesRead) {
    break;
  }
}

console.log(new TextDecoder().decode(buf));

conn.close();

// Run the script using the following command:
// deno run --allow-net scripts/dummy-client.ts
