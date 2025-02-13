export function parseRequest(httpReq: string) {
  const lines = httpReq.split(/\r?\n/);

  const requestLine = lines[0];

  const parts = requestLine.split(/\s+/);

  const method = parts[0];
  const path = parts[1];
  const protocol = parts[2];

  let currentLineIndex = 1;

  const headers: Record<string, string> = {};

  // parse the header lines
  while (true) {
    // break if we are done
    const currentLine = lines[currentLineIndex];

    if (!currentLine) {
      break;
    }

    const lineParts = currentLine.split(/:\s*/);
    if (lineParts.length === 2) {
      headers[lineParts[0]] = lineParts[1];
    }

    currentLineIndex++;
  }

  const body = lines.slice(currentLineIndex).filter((l) => !!l).join("").trim();

  return {
    method,
    path,
    protocol,
    headers,
    body,
  };
}

export type HttpResponseOptions = {
  statusCode: number;
  body?: string;
  headers?: Record<string, string>;
};

export function createResponse(
  { statusCode, body, headers }: HttpResponseOptions,
) {
  let response = `HTTP/1.1 ${statusCode} OK\n`;
  for (const key in headers) {
    response += `${key}: ${headers[key]}\n`;
  }
  response += `\r\n${body}\r\n`;
  return response;
}

export type HttpRequest = ReturnType<typeof parseRequest>;

export function mapFileToContentType(fileName: string) {
  if (fileName.endsWith(".html")) {
    return "text/html";
  }
  if (fileName.endsWith(".css")) {
    return "text/css";
  }
  if (fileName.endsWith(".js")) {
    return "text/javascript";
  }

  return "text/plain";
}
