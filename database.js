
import pgPromise from 'pg-promise';


const pgp = pgPromise();


const connectionString = process.env.DATABASE_URL || 'postgres://bheka:OByrOSiZ7tqz1mAzx72ukmRZNAPr0Iol@dpg-cj5qva2cn0vc73flmoq0-a.oregon-postgres.render.com/razorma_r4tr';
const ssl = { rejectUnauthorized: false }

const db = pgp({ connectionString, ssl });


async function createUsersTable() {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      greeted_count INTEGER DEFAULT 0
    );
  `;
    await db.none(createTableQuery);
    console.log('Table "users" created successfully.');


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

async function addUser(username) {
  try {
    const insertQuery = `
      INSERT INTO users (username, greeted_count)
      VALUES ($1, 1)
      ON CONFLICT (username) DO UPDATE
      SET greeted_count = users.greeted_count + 1
      RETURNING id;
    `;
    const result = await db.oneOrNone(insertQuery, [username]);
    if (result) {
      console.log(`User "${username}" greeted. Greeted count: ${result.greeted_count}`);
    } else {
      console.log(`User "${username}" already exists. Greeting count updated.`);
    }
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}




async function getUsers() {
    try {
      const selectQuery = `
        SELECT * FROM users;
      `;
      const users = await db.any(selectQuery);
      // console.log('All users:');
      // console.log(users);
      return users
    } catch (error) {
      console.error('Error getting users:', error.message);
    }
  }
  async function getGreetedUsersCount() {
    try {
      const selectQuery = `
        SELECT COUNT(*) FROM users;
      `;
      const countResult = await db.one(selectQuery);
      const totalCount = countResult.count;
      // console.log(`Total users greeted: ${totalCount}`);
      return totalCount
    } catch (error) {
      console.error('Error getting greeted users count:', error.message);
    }
  }
  
  async function removeAllUsers() {
    try {
      const deleteQuery = `
        DELETE FROM users;
      `;
      await db.none(deleteQuery);
      // console.log('All users removed successfully.');
  
      const resetSequenceQuery = `
        ALTER SEQUENCE users_id_seq RESTART WITH 1;
      `;
      await db.none(resetSequenceQuery);
      // console.log('User ID sequence reset.');
    } catch (error) {
      console.error('Error removing users:', error.message);
    }
  }
  
export {
  createUsersTable,
  getUsers,
  addUser,
  getGreetedUsersCount,
  removeAllUsers,
};

export { db };

