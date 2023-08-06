import assert from 'assert';
import {
  createUsersTable,
  addUser,
  getUsers,
  getGreetedUsersCount,
  removeAllUsers
} from '../database.js';


describe('Database Functions', function () {
    this.timeout(5000);
  before(async function () {
    await createUsersTable();
  });

  afterEach(async function () {
    await removeAllUsers();
  });

  it('should add and retrieve users', async function () {
    await addUser('User1');
    await addUser('User2');
            
    const users = await getUsers();

    assert.equal(users.length, 2);
    assert.equal(users[0].username, 'User1');
    assert.equal(users[1].username, 'User2');

  });

  it('should count greeted users', async function () {
    await addUser('User1');
    await addUser('User2');

    const greetedCount = await getGreetedUsersCount();
    assert.strictEqual(parseFloat(greetedCount), 2);
  });

  it('should remove all users', async function () {
    await addUser('User1');
    await addUser('User2');

    await removeAllUsers();

    const users = await getUsers();
    assert.strictEqual(users.length, 0);
  });
});

