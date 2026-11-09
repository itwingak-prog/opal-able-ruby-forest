import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const destDir = ".vercel/output/functions/__server.func/_libs";
const srcDir = "node_modules/@electric-sql/pglite/dist";
if (!existsSync(destDir)) process.exit(0);
for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
  copyFileSync(join(srcDir, name), join(destDir, name));
}
