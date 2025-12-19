import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding mock data for Storybook visualization...');
  
  // This is a UI library, so we don't have a real database.
  // However, this script simulates generating mock data structures
  // that might be used in stories or tests.
  
  const mockUsers = [
    { id: '1', name: 'Alice Admin', role: 'SuperAdmin' },
    { id: '2', name: 'Bob Brand', role: 'BrandAdmin' },
    { id: '3', name: 'Charlie Customer', role: 'User' },
  ];

  console.log('Mock users generated:', mockUsers);
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });