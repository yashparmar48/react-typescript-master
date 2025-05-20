import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

// Define the User type
type User = {
  id: number;
  name: string;
  email: string;
};

// Define the socket type
let socket: Socket | null = null;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vMW9uZUBnbWFpbC5jb20iLCJpYXQiOjE3NDc3MjI2MjAsImV4cCI6MTc0NzcyNjIyMH0.jfPDAnYVpVEg8Pm5yrhbWBPE_-Xa_uXARsPDQECkLIE`;

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await axios.get<{ data: User[] }>('http://localhost:3000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Connect to socket server
    socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket?.id);
    });

    socket.on('message', (data: string) => {
      console.log('Socket Message Received:', data);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket?.off('message');
      socket?.disconnect();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">User List</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <table className="min-w-full border border-gray-200 rounded overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 transition">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
