import assert from 'assert';
import {db} from "../index.js"
import AddAndRetrieveNames from "../database.js";
import createUsersTable from "../tables.js"
const addAndRetrieveNames = AddAndRetrieveNames(db)
 
describe('Database Functions', function () {
    this.timeout(7000);
  before(async function () {
    await createUsersTable(db);
  });

  afterEach(async function () {
    await addAndRetrieveNames.removeAllUsers();
  });

  it('should add and retrieve users', async function () {
    await addAndRetrieveNames.addUser('User1');
    await addAndRetrieveNames.addUser('User2');
            
    const users = await addAndRetrieveNames.getUsers();

    assert.equal(users.length, 2);
    assert.equal(users[0].username, 'User1');
    assert.equal(users[1].username, 'User2');

  });

  it('should count greeted users', async function () {
    await addAndRetrieveNames.addUser('User1');
    await addAndRetrieveNames.addUser('User2');

    const greetedCount = await addAndRetrieveNames.getGreetedUsersCount();
    assert.strictEqual(parseFloat(greetedCount), 2);
  });

  it('should remove all users', async function () {
    await addAndRetrieveNames.addUser('User1');
    await addAndRetrieveNames.addUser('User2');

    await addAndRetrieveNames.removeAllUsers();

    const users = await addAndRetrieveNames.getUsers();
    assert.strictEqual(users.length, 0);
  });
});

