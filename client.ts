// The code for the server is in server.ts, and can be started by running `deno task dev:server` in the terminal.

const httpRequestString = `GET / HTTP/1.1
User-Agent: Mozilla/5.0
Accept: text/html
Connection: close
\r\n\r\n
`;

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
// deno task dev:client
