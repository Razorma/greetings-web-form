
// Export a function that takes a 'db' parameter
export default function AddAndRetrieveNames(db) {

  // Define an asynchronous function to add a user
  async function addUser(username) {
    // SQL query to insert or update a user's greeted count
    const insertQuery = `
      INSERT INTO users (username, greeted_count)
      VALUES ($1, 1)
      ON CONFLICT (username) DO UPDATE
      SET greeted_count = users.greeted_count + 1
      RETURNING id;
    `;
    // Execute the query and handle the result
    const result = await db.oneOrNone(insertQuery, [username]);
    if (result) {
      console.log(`User "${username}" greeted. Greeted count: ${result.greeted_count}`);
    } else {
      console.log(`User "${username}" already exists. Greeting count updated.`);
    }
  }

  // Define an asynchronous function to get all users
  async function getUsers() {
    // SQL query to retrieve all users
    const selectQuery = `
        SELECT * FROM users;
      `;
    // Execute the query and return the result
    const users = await db.any(selectQuery);
    return users
  }

  // Define an asynchronous function to get the total count of greeted users
  async function getGreetedUsersCount() {
    // SQL query to count the total number of users
    const selectQuery = `
        SELECT COUNT(*) FROM users;
      `;
    // Execute the query and return the result
    const countResult = await db.one(selectQuery);
    const totalCount = countResult.count;
    return totalCount
  }

  // Define an asynchronous function to remove all users
  async function removeAllUsers() {
    // SQL query to delete all users
    const deleteQuery = `
        DELETE FROM users;
      `;
    // Execute the query to delete users and reset ID sequence
    await db.none(deleteQuery);
    const resetSequenceQuery = `
        ALTER SEQUENCE users_id_seq RESTART WITH 1;
      `;
    await db.none(resetSequenceQuery);
  }

  // Return the functions as part of an object
  return {
    getUsers,
    addUser,
    getGreetedUsersCount,
    removeAllUsers,
  };
}



