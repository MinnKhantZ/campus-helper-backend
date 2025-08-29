import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/db.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runSeeders = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Get all seeder files
    const seedersDir = path.join(__dirname, 'seeders');
    const seederFiles = fs.readdirSync(seedersDir)
      .filter(file => file.endsWith('.js'))
      .sort(); // Run in alphabetical order (timestamp order)

    console.log(`Found ${seederFiles.length} seeder(s) to run.`);

    // Run each seeder
    for (const seederFile of seederFiles) {
      console.log(`\nRunning seeder: ${seederFile}`);
      const seederPath = path.join(seedersDir, seederFile);

      // Convert path to file:// URL for ES modules on Windows
      const seederUrl = new URL(`file://${seederPath.replace(/\\/g, '/')}`).href;

      // Import the seeder module
      const seeder = await import(seederUrl);

      // Run the up method
      if (seeder.default && seeder.default.up) {
        await seeder.default.up();
        console.log(`✓ Seeder ${seederFile} completed successfully.`);
      } else {
        console.log(`⚠ Seeder ${seederFile} does not have an up method.`);
      }
    }

    console.log('\n🎉 All seeders completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeders:', error);
    process.exit(1);
  }
};

// Run seeders
runSeeders();
