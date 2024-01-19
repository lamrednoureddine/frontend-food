import axios from 'axios';
import { useState, useEffect } from 'react';
import './Commandes.css';

const Commandes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/order');
            setData(response.data);
        };
        fetchData();
    }, []);

    return (
        <div className="commandes-container">
            <h1 className="title">List of Orders</h1>
            <ul className="order-list">
                {data.map((order) => (
                    <li className="order-item" key={order._id} >
                        <span className="user-name">{order.userId?.nom} {order.userId?.prenom} {order.userId?.tel}</span>
                        <span className="user-email">{order.userId?.email}</span>
                        <span className="user-email">à payer : {order.totalPrice}$</span>
                        {/* Show other details like items and totalPrice if needed */}
                    </li>
                ))}
            </ul>
{/* <UserLocation/> */}
        </div>
    );
};

export default Commandes;
