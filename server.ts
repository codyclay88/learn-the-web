import { createResponse, mapFileToContentType, parseRequest } from "./utils.ts";

const listener = Deno.listen({ port: 8824, transport: "tcp" });

const publicDir = Deno.readDir("./public");
const publicFiles: string[] = [];
for await (const dir of publicDir) {
  if (dir.isFile) {
    publicFiles.push("/" + dir.name);
  }
}

for await (const conn of listener) {
  const buf = new Uint8Array(1024);

  console.log("Reading request data...");
  await conn.read(buf);

  const request = new TextDecoder().decode(buf);

  console.log(request);

  const reqObj = parseRequest(request);
  const { method, path, headers } = reqObj;

  console.log("Request received... sending response");

  const isPublicFile = publicFiles.includes(path);

  let fulfilledRequest = false;

  if (method === "GET" && isPublicFile) {
    const pageFile = await Deno.readFile(`./public${path}`);

    const pageData = new TextDecoder().decode(pageFile);

    const contentType = mapFileToContentType(path);

    const response = createResponse({
      statusCode: 200,
      body: pageData,
      headers: {
        "Content-Type": contentType,
        "Content-Length": pageData.length.toString(),
      },
    });

    console.log(response);

    await conn.write(new TextEncoder().encode(response));
    fulfilledRequest = true;
  }

  if (!fulfilledRequest) {
    console.log("Could not fulfill the request!");

    const notFoundMessage = `HTTP/1.1 404 Not Found\r\n\r\n`;

    await conn.write(new TextEncoder().encode(notFoundMessage));
  }

  if (headers["Connection"] === "close") {
    conn.close();
  }
}
