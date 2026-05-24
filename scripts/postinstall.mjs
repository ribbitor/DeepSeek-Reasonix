#!/usr/bin/env node
// No-op when run from the published tarball (no dashboard/package.json shipped) —
// only the git checkout has workspace deps to install.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

if (!existsSync("dashboard/package.json")) process.exit(0);

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const opts = { stdio: "inherit", shell: false };
execFileSync(npm, ["--prefix", "dashboard", "ci", "--ignore-scripts"], opts);
execFileSync(npm, ["--prefix", "desktop", "ci", "--ignore-scripts"], opts);
