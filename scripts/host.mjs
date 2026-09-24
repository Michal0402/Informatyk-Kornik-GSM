import { spawn } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { watch } from "node:fs";

const port = process.env.PORT ?? "3000";
let server;
let timer;
let busy = false;
let again = false;

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", args, { stdio: "inherit", shell: true });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`npx ${args.join(" ")} zakończył się kodem ${code}`))));
  });
}

async function cycle() {
  if (busy) {
    again = true;
    return;
  }
  busy = true;
  try {
    if (server && !server.killed) server.kill();
    await new Promise((resolve) => setTimeout(resolve, 400));
    await run(["next", "build"]);
    server = spawn("npx", ["next", "start", "-p", port], { stdio: "inherit", shell: true });
  } catch (error) {
    console.error(error);
  } finally {
    busy = false;
    if (again) {
      again = false;
      schedule();
    }
  }
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    void cycle();
  }, 2000);
}

if (!existsSync(".rebuild")) writeFileSync(".rebuild", "");
if (existsSync(".next")) {
  server = spawn("npx", ["next", "start", "-p", port], { stdio: "inherit", shell: true });
} else {
  await cycle();
}

watch(".rebuild", schedule);
console.log(`Panel: http://localhost:${port}/admin`);
