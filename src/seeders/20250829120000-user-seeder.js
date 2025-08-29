import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default {
  up: async () => {
    // Hash passwords
    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('admin123', saltRounds);
    const studentPassword1 = await bcrypt.hash('student123', saltRounds);
    const studentPassword2 = await bcrypt.hash('student123', saltRounds);
    const studentPassword3 = await bcrypt.hash('student123', saltRounds);

    // Create sample users
    await User.bulkCreate([
      {
        name: 'Admin User',
        phone: '+1234567890',
        password: adminPassword,
        role: 'admin',
        major: null,
        rollno: null,
      },
      {
        name: 'John Doe',
        phone: '+1234567891',
        password: studentPassword1,
        role: 'student',
        major: 'Computer Science',
        rollno: 'CS2025001',
      },
      {
        name: 'Jane Smith',
        phone: '+1234567892',
        password: studentPassword2,
        role: 'student',
        major: 'Electrical Engineering',
        rollno: 'EE2025002',
      },
      {
        name: 'Bob Johnson',
        phone: '+1234567893',
        password: studentPassword3,
        role: 'student',
        major: 'Business Administration',
        rollno: 'BA2025003',
      },
    ]);

    console.log('User seeder completed successfully');
  },

  down: async () => {
    // Remove all seeded users
    await User.destroy({
      where: {
        phone: ['+1234567890', '+1234567891', '+1234567892', '+1234567893']
      }
    });

    console.log('User seeder rollback completed successfully');
  }
};
