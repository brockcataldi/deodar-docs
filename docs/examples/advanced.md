# Advanced Examples

More complex examples showing advanced usage patterns.

## Batch Operations

```javascript
import { Client } from '@ourcompany/sdk';

const client = new Client({
  apiKey: process.env.API_KEY
});

async function batchCreateUsers() {
  const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' }
  ];
  
  // Create multiple users in parallel
  const results = await Promise.all(
    users.map(user => client.users.create(user))
  );
  
  console.log('Created users:', results);
}
```

## Error Handling

```javascript
async function handleErrors() {
  try {
    const user = await client.users.get('invalid-id');
  } catch (error) {
    if (error.status === 404) {
      console.log('User not found');
    } else if (error.status === 401) {
      console.log('Unauthorized - check your API key');
    } else {
      console.log('Unexpected error:', error.message);
    }
  }
}
```

## Webhooks

```javascript
// Set up a webhook endpoint
app.post('/webhook', (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'user.created':
      console.log('New user created:', data);
      break;
    case 'user.updated':
      console.log('User updated:', data);
      break;
    default:
      console.log('Unknown event:', event);
  }
  
  res.status(200).send('OK');
});
```
