import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the list of counselors from the backend
    const fetchCounselors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/counselors'); // Replace with your actual endpoint
        setCounselors(response.data);
      } catch (error) {
        console.error('Error fetching counselors:', error);
      }
    };

    fetchCounselors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCounselor || !date || !time) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const appointmentData = {
        counselorId: selectedCounselor,
        date,
        time,
      };
      await axios.post('http://localhost:5000/api/appointments', appointmentData); // Replace with your actual endpoint
      setMessage('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label htmlFor="counselor" className="block mb-2">Select Counselor:</label>
          <select
            id="counselor"
            value={selectedCounselor}
            onChange={(e) => setSelectedCounselor(e.target.value)}
            className="border border-gray-300 p-2"
          >
            <option value="">Select a counselor</option>
            {counselors.map((counselor) => (
              <option key={counselor._id} value={counselor._id}>
                {counselor.name} - {counselor.specialization}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="date" className="block mb-2">Select Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="time" className="block mb-2">Select Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 p-2"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Book Appointment</button>
      </form>
      {message && <p className="mt-2 text-red-600">{message}</p>}
    </div>
  );
};

export default BookAppointment;
