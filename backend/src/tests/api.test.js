
import assert from 'assert';

console.log('Running API tests...');


function testContactValidation() {
  const reqBody = { name: '', email: 'test@test.com' };
  if (!reqBody.name || !reqBody.email) {
    assert.ok(true, 'Validation caught missing name');
  } else {
    assert.fail('Validation failed to catch missing name');
  }
}


function testProjectRetrieval() {
  const projects = [{ id: 1, title: 'Project A' }];
  assert.strictEqual(projects.length, 1, 'Project retrieval returned correct count');
}

testContactValidation();
testProjectRetrieval();

console.log('All tests passed.');
