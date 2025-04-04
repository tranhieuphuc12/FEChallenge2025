// index.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
const PORT = 8080;

    const allUsers = Array.from({ length: 100 }, (_, i) => ({
        id: String(i + 1),
        name: `User ${i + 1}`,
        balance: Math.floor(Math.random() * 10000),
        email: `user${i + 1}@example.com`,
        RegisteredAt: new Date(),
        active: Math.random() > 0.5,
    }));


// Define a route to send all users
app.get('/api/users', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = allUsers.slice(startIndex, endIndex);
    const totalUsers = allUsers.length;
    const totalPages = Math.ceil(totalUsers / limit);

    const usersWithFormattedDates = users.map(user => ({ 
        ...user,
        RegisteredAt: user.RegisteredAt.toISOString(),
      }));


    res.json({
        users: usersWithFormattedDates,
        totalUsers,
        totalPages,
        currentPage: page,
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
