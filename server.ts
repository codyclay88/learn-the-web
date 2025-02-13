import { createResponse, parseRequest } from "./utils.ts";

const listener = Deno.listen({ port: 8824, transport: "tcp" });

for await (const conn of listener) {
  const buf = new Uint8Array(1024);

  console.log("Reading request data...");
  const bytesRead = await conn.read(buf);

  console.log(bytesRead);

  const request = new TextDecoder().decode(buf);
  console.log(request);

  const reqObj = parseRequest(request);
  const { method, path, protocol } = reqObj;
  console.log("METHOD:", method);
  console.log("PATH:", path);
  console.log("PROTOCOL:", protocol);

  console.log("Request received... sending response");

  let fulfilledRequest = false;

  if (path === "/" && method === "GET") {
    const indexPageFile = await Deno.readFile("./pages/index/page.html");
    const indexPage = new TextDecoder().decode(indexPageFile);

    const response = createResponse({
      statusCode: 200,
      body: indexPage,
      headers: {
        "Content-Type": "text/html",
        "Content-Length": indexPage.length.toString(),
      },
    });

    console.log(response);

    await conn.write(new TextEncoder().encode(response));
    fulfilledRequest = true;
  }

  if (path === "/page.css" && method === "GET") {
    const cssFile = await Deno.readFile("./pages/index/page.css");
    const css = new TextDecoder().decode(cssFile);

    const response = createResponse({
      statusCode: 200,
      body: css,
      headers: {
        "Content-Type": "text/css",
        "Content-Length": css.length.toString(),
      },
    });

    console.log(response);

    await conn.write(new TextEncoder().encode(response));
    fulfilledRequest = true;
  }

  if (!fulfilledRequest) {
    const notFoundMessage = `HTTP/1.1 404 Not Found`;

    await conn.write(new TextEncoder().encode(notFoundMessage));
  }

  conn.close();
}
