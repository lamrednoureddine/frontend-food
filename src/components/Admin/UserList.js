import axios from 'axios';
import { useState, useEffect } from 'react';
import "./UserList.css"; // Import the styles

const UserList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setData(response.data);
    };

    const handleDelete = async (userId) => {
      console.log(userId);
        await axios.delete(`http://localhost:5000/users/${userId}`);
        fetchData(); // Refetch the data after deleting
    };

    return (
        <div className="user-list-container">
            <h1 className="user-list-title">User List</h1>
            <ul className="user-list">
                {data.map((user) => (
                    <li className="user-list-item" key={user._id}>
                      
                        <h4 className="user-name">{user.nom}</h4>
                        <h4 className="user-email">{user.email}</h4>
                        <h4 className="user-email">{user.tel}</h4>
                        <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
