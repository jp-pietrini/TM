import { db } from './index';
import { users, profiles } from './schema';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create client user
    const [clientUser] = await db
      .insert(users)
      .values({
        email: 'client@test.com',
        passwordHash: hashedPassword,
        role: 'client',
        emailVerified: true,
        isActive: true,
        profileCompleted: true,
      })
      .returning();

    console.log('✅ Created client user:', clientUser.email);

    // Create client profile
    await db.insert(profiles).values({
      userId: clientUser.id,
      firstName: 'Juan',
      lastName: 'Cliente',
      zipCode: '03100', // Roma Norte
    });

    console.log('✅ Created client profile');

    // Create worker user
    const [workerUser] = await db
      .insert(users)
      .values({
        email: 'worker@test.com',
        passwordHash: hashedPassword,
        role: 'worker',
        emailVerified: true,
        isActive: true,
        isApproved: true,
        profileCompleted: true,
      })
      .returning();

    console.log('✅ Created worker user:', workerUser.email);

    // Create worker profile
    await db.insert(profiles).values({
      userId: workerUser.id,
      firstName: 'Pedro',
      lastName: 'Trabajador',
      zipCode: '06100', // Condesa
    });

    console.log('✅ Created worker profile');

    // Create admin user
    const [adminUser] = await db
      .insert(users)
      .values({
        email: 'admin@trustme.mx',
        passwordHash: hashedPassword,
        role: 'admin',
        emailVerified: true,
        isActive: true,
        isApproved: true,
        profileCompleted: true,
      })
      .returning();

    console.log('✅ Created admin user:', adminUser.email);

    // Create admin profile
    await db.insert(profiles).values({
      userId: adminUser.id,
      firstName: 'Admin',
      lastName: 'TrustMe',
    });

    console.log('✅ Created admin profile');

    // Create support user
    const [supportUser] = await db
      .insert(users)
      .values({
        email: 'support@trustme.mx',
        passwordHash: hashedPassword,
        role: 'support',
        emailVerified: true,
        isActive: true,
        isApproved: true,
        profileCompleted: true,
      })
      .returning();

    console.log('✅ Created support user:', supportUser.email);

    // Create support profile
    await db.insert(profiles).values({
      userId: supportUser.id,
      firstName: 'Soporte',
      lastName: 'TrustMe',
    });

    console.log('✅ Created support profile');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Test credentials (all users):');
    console.log('   Password: password123');
    console.log('\n👤 Test users:');
    console.log('   Client: client@test.com');
    console.log('   Worker: worker@test.com');
    console.log('   Admin: admin@trustme.mx');
    console.log('   Support: support@trustme.mx');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
