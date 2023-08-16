 export default async function createUsersTable(db) {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          greeted_count INTEGER DEFAULT 0
        );
      `;
        await db.none(createTableQuery);
    
    
        const checkConstraintQuery = `
          SELECT constraint_name
          FROM information_schema.table_constraints
          WHERE table_name = 'users' AND constraint_type = 'UNIQUE';
        `;
        const existingConstraint = await db.oneOrNone(checkConstraintQuery);
    
        if (!existingConstraint) {
          const addUniqueConstraintQuery = `
            ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);
          `;
          await db.none(addUniqueConstraintQuery);
          console.log('Unique constraint added to "username" column.');
        } else {
          console.log('Unique constraint already exists.');
        }
    
      } catch (error) {
        console.error('Error creating table:', error.message);
      }
  }