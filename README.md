# Campus Helper Backend

## Database Seeding

This project includes database seeders to populate the database with initial data.

### Running Seeders

To run all seeders, use the following command:

```bash
npm run seed
```

This will execute all seeder files in the `src/seeders/` directory in alphabetical order.

### Available Seeders

- **20250829120000-user-seeder.js**: Creates sample users including:
  - 1 Admin user (phone: +1234567890, password: admin123)
  - 3 Student users with different majors

### Seeder Structure

Each seeder file exports an object with two methods:
- `up()`: Runs the seeding logic
- `down()`: Rolls back the seeding (removes the seeded data)

### Adding New Seeders

1. Create a new file in `src/seeders/` with the format: `YYYYMMDDHHMMSS-description-seeder.js`
2. Export an object with `up` and `down` methods
3. The `up` method should contain the logic to create your seed data
4. The `down` method should contain the logic to remove the seed data

Example:
```javascript
export default {
  up: async () => {
    // Your seeding logic here
  },

  down: async () => {
    // Your rollback logic here
  }
};
```
