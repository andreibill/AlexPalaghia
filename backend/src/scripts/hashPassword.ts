import bcrypt from 'bcrypt';

const password = process.argv[2];

if (!password) {
  console.error('Usage: npx ts-node src/scripts/hashPassword.ts "your-password"');
  process.exit(1);
}

async function main() {
  const hash = await bcrypt.hash(password, 12);
  console.log('\nGenerated bcrypt hash:\n');
  console.log(hash);
  console.log('\nPaste this into your .env file as ADMIN_PASSWORD_HASH\n');
}

main();
