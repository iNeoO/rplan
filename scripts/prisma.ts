import { exec } from 'child_process';

const [a, b, ...args] = process.argv || 'studio';
const schemaPath = 'packages/backend/prisma/schema.prisma';

const command = `npx prisma ${args.join(' ')} --schema ${schemaPath}`;

console.log(command);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});