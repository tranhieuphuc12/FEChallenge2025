import React, { useCallback, useEffect, useRef, useState } from 'react';
import './css/app.css';
import { TUser } from './types/TUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Pagination from './components/Pagination';

const USERS_PER_PAGE = 10;

function App() {
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState((false));
  const [users, setUsers] = useState<TUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState('name');
  const [orderBy, setOrderBy] = useState('asc');


  //Fetch users from API localhost:8080/api/users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/api/users?page=${currentPage}&limit=${USERS_PER_PAGE}&sortBy=${sortBy}&orderBy=${orderBy}`);
        if (!response.ok) {
          setError('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setTotalUsers(data.totalUsers);
        console.log('Users fetched:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, [currentPage, sortBy, orderBy]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  }

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedUsers(users.map((user) => user.id));
    } else {
      setCheckedUsers([]);
    }
  };

  const handleCheckUser = (userId: string) => {
    setCheckedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }


  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>

        <div className="controls">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="balance">Sort by Balance</option>
            <option value="registeredAt">Sort by Registration Date</option>
          </select>

          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="check-all"
                  onChange={handleCheckAll}
                />
                <label htmlFor="check-all">Name</label>
              </th>
              <th>Balance ($)</th>
              <th>Email</th>
              <th>Registration</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td data-label="Name">
                  <input type="checkbox" id={`checkbox-${user.id}`}
                    onChange={() => handleCheckUser(user.id)}
                    checked={checkedUsers.includes(user.id)} />
                  <label htmlFor={`checkbox-${user.id}`}>
                    {user.name}
                  </label>
                </td>
                <td data-label="Balance">
                  {`$${user.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                  })}`}
                </td>
                <td data-label="Email">
                  <button className="link-button" onClick={() => alert(`Email: ${user.email}`)}>{user.email}
                  </button></td>
                <td
                  data-label="Registration"
                  data-hover={new Date(user.registeredAt).toLocaleString()}
                  className="hover-td"
                >
                  {new Date(user.registeredAt).toLocaleDateString()}
                </td>
                <td data-label="Status">
                  <button className='status-button'>Status</button>
                </td>
                <td data-label="Action">
                  <button className='action-button'>
                    <FontAwesomeIcon icon={faEdit}
                    /></button>
                  <button className='action-button'>
                    <FontAwesomeIcon icon={faTrash}
                    /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Total Users */}
        <div className="footer">
          <div className="total-users">
            <span>Total Users: {totalUsers}</span>
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
