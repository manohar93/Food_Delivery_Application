import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from './../../../../frontend/src/assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3 className="order-title">Order Page</h3>
      <div className="order-list">
        <div className="order-header">
          <p>Icon</p>
          <p>Food Items</p>
          <p>Name</p>
          <p>Address</p>
          <p>Phone</p>
          <p>Items</p>
          <p>Amount</p>
          <p>Status</p>
        </div>
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-col">
              <img src={assets.parcel_icon} alt="icon" />
            </div>
            <div className="order-col">
              <p className="order-item-food">
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
            </div>
            <div className="order-col">
              <p className="order-item-name">{order.address.firstName} {order.address.lastName}</p>
            </div>
            <div className="order-col">
              <p>{order.address.state},</p>
              <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
            </div>
            <div className="order-col">
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <div className="order-col">
              <p>{order.items.length}</p>
            </div>
            <div className="order-col">
              <p>${order.amount}</p>
            </div>
            <div className="order-col">
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
