import { parseRequest } from "./utils.ts";
import { assertEquals } from "@std/assert";

const requestString = `GET / HTTP/1.1
User-Agent: Mozilla/5.0
Accept: text/html
Connection: close
\r\n\r\n

This is a test. 
`;

Deno.test({
  name: "Can parse the request method",
  fn: () => {
    const request = parseRequest(requestString);
    assertEquals(request.method, "GET");
  },
});

Deno.test({
  name: "Can parse the path",
  fn: () => {
    const request = parseRequest(requestString);
    assertEquals(request.path, "/");
  },
});

Deno.test({
  name: "Can parse the protocol",
  fn: () => {
    const request = parseRequest(requestString);
    assertEquals(request.protocol, "HTTP/1.1");
  },
});

Deno.test({
  name: "Can parse headers",
  fn: () => {
    const request = parseRequest(requestString);
    assertEquals(request.headers["User-Agent"], "Mozilla/5.0");
    assertEquals(request.headers["Accept"], "text/html");
    assertEquals(request.headers["Connection"], "close");
  },
});

Deno.test({
  name: "Can parse body",
  fn: () => {
    const request = parseRequest(requestString);
    assertEquals(request.body, "This is a test.");
  },
});
