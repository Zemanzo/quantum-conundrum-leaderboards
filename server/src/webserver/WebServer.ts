import path from "node:path";
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import Database from "../database/Database";
import apiRoutes from "./api/api";

const SECURITY_HEADERS = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self'",
    // styled-components injects style tags
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "img-src 'self' data: https://qc.zemanzo.nl",
    "connect-src 'self' https://www.speedrun.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
};

type WebServerOptions = {
  host: string;
  port: number;
  /**
   * Directory with the built client. Not served when undefined, e.g. during
   * development, when the Vite dev server serves the client.
   */
  staticDir?: string;
};

class WebServer {
  server;

  constructor(db: Database, { host, port, staticDir }: WebServerOptions) {
    this.server = fastify({
      logger: false,
    });

    /**
     * Middleware
     */
    this.server.addHook("onSend", async (request, reply) => {
      reply.headers(SECURITY_HEADERS);
    });

    // Add some objects to the instance, so we can access it on all our routes.
    this.server.decorate("db", db);

    /**
     * Routes
     */
    this.server.register(apiRoutes);

    if (staticDir) {
      this.server.register(fastifyStatic, {
        root: path.resolve(staticDir),
        wildcard: false,
        setHeaders: (res, filePath) => {
          // Vite puts content hashes in the file names of assets.
          res.header(
            "Cache-Control",
            filePath.includes(`${path.sep}assets${path.sep}`)
              ? "public, max-age=31536000, immutable"
              : "no-cache",
          );
        },
      });
    }

    this.server.setNotFoundHandler((req, res) => {
      if (staticDir && req.method === "GET" && !req.url.startsWith("/api/")) {
        // Client side routing
        return res.sendFile("index.html");
      }
      return res.code(404).send({ error: "endpoint not found" });
    });

    this.server.addHook("onError", async (request, reply, error) => {
      console.error(error);
    });

    /**
     * Start listening
     */
    this.server.listen({ host, port }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log(`🌐 public endpoints available at ${address}`);
      }
    });
  }

  close() {
    return this.server.close();
  }
}

export default WebServer;
