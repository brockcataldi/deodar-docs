# Quick Start Example

Get up and running with our platform in just a few minutes.

## Prerequisites

- Node.js 18+ or Python 3.8+
- An API key from your dashboard

## JavaScript Example

```javascript
import { Client } from '@ourcompany/sdk';

const client = new Client({
  apiKey: process.env.API_KEY
});

async function main() {
  try {
    // Create a new user
    const user = await client.users.create({
      name: 'John Doe',
      email: 'john@example.com'
    });
    
    console.log('User created:', user);
    
    // List all users
    const users = await client.users.list();
    console.log('All users:', users);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Python Example

```python
from ourcompany import Client

client = Client(api_key='your-api-key')

# Create a new user
user = client.users.create(
    name='John Doe',
    email='john@example.com'
)

print('User created:', user)

# List all users
users = client.users.list()
print('All users:', users)
```
