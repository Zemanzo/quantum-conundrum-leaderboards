# quantum-conundrum-leaderboards

Speed and shift records for Quantum Conundrum, using data from speedrun.com. Runs at
[qc.zemanzo.nl](https://qc.zemanzo.nl).

The code itself is pretty rushed cause I don't care enough to make it proper and truthfully, I don't
have the time for it either.

- `client/` is the front-end (React, Vite)
- `server/` is the back-end (Fastify, SQLite). It fetches runs from speedrun.com, stores the shift
  records and serves the built client.

## Development

Requires Node 24 and pnpm (`corepack enable`).

```sh
pnpm install
pnpm dev:server # API on http://localhost:3006
pnpm dev:client # http://localhost:5173, proxies /api to the server
```

The server is configured with environment variables:

| Variable          | Default                    | Description                                         |
| ----------------- | -------------------------- | --------------------------------------------------- |
| `DATABASE_PATH`   | `./qcls-data.db3`          | SQLite database file                                |
| `HOST`            | `127.0.0.1`                | Address to listen on                                |
| `PORT`            | `3006`                     | Port to listen on                                   |
| `STATIC_DIR`      | (none)                     | Directory with the built client to serve            |
| `SUBMIT_PASSWORD` | (none)                     | Password for `/submit`. Submitting is off when unset |

## Deployment

The app runs as a single container, built from the `Dockerfile`. It listens on port 3006, runs as
an unprivileged user (UID 65532) and keeps its database in `/data`, so mount a volume there. Set
`SUBMIT_PASSWORD` to enable submitting, and put a reverse proxy in front of it for TLS.

To import an existing database into a volume (before starting the container, or with it stopped),
using the absolute path of the database file:

```sh
docker run --rm -v <volume>:/data -v /path/to/qcls-data.db3:/import.db3:ro busybox \
  sh -c 'cp /import.db3 /data/qcls-data.db3 && chown -R 65532:65532 /data'
```

## Maintenance

- Dependabot alerts and security updates are enabled in the GitHub repository settings.
- Rebuild and redeploy every few months, and whenever there is a security alert. Build with
  `--pull` to also pick up security updates of the Node and Debian base images.
- pnpm won't install package versions that are less than 7 days old (`minimumReleaseAge` in
  `pnpm-workspace.yaml`). For an urgent fix, add the package to `minimumReleaseAgeExclude`.
- Node 24 is supported until April 2028. Update the `node` images in the `Dockerfile` before then.
