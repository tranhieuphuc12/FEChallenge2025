// index.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
const PORT = 8080;

    const allUsers = Array.from({ length: 100 }, (_, i) => ({
        id: String(i + 1),
        name: `User ${i + 1}`,
        balance: Math.floor(i * 10000),
        email: `user${i + 1}@example.com`,
        registeredAt: new Date(),
        active: Math.random() > 0.5,
    }));


// Define a route to send all users
app.get('/api/users', (req, res) => {
    let {page , limit, sortBy, orderBy} = req.query;


    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;

    orderBy = orderBy == 'asc' ? 'asc' : 'desc';

    let filteredUsers = [...allUsers];
    // Sorting
    if (sortBy) {
        filteredUsers.sort((a, b) => {
            if (sortBy === 'name') {
                return orderBy === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }else if (sortBy === 'balance') {
                return orderBy === 'asc' ? a.balance - b.balance : b.balance - a.balance;
            }
            else if (sortBy === 'registeredAt') {
                return orderBy === 'asc' ? new Date(a.registeredAt) - new Date(b.registeredAt) : new Date(b.registeredAt) - new Date(a.registeredAt);
            }
            return 0;
        });
    }




    // Pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    


    const users = filteredUsers.slice(startIndex, endIndex);
    const totalUsers = filteredUsers.length;
    const totalPages = Math.ceil(totalUsers / limitNum);

    const usersWithFormattedDates = users.map(user => ({ 
        ...user,
        registeredAt: user.registeredAt.toISOString(),
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
