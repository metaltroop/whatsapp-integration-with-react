import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have your server running on localhost:3001
      const response = await fetch('http://localhost:3001/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        console.log('Message sent successfully');
        alert('check whatsapp');
        // Reset form fields after successful submission
        setFormData({
          name: "",
          message: "",
          phone: "",
        });
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="border rounded w-full py-2 px-3"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Message:
        </label>
        <textarea
          className="border rounded w-full py-2 px-3"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone Number:
        </label>
        <input
          className="border rounded w-full py-2 px-3"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Send
      </button>
    </form>
  );
};

export default Form;
