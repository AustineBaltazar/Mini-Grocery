import React, { useEffect, useState } from "react";
import axios from "axios";

function Staff() {
  const [staffData, setStaffData] = useState([]);
  const [newStaffMember, setNewStaffMember] = useState({
    staffName: "",
    position: "",
    totalSales: "",
    shift: "",
    contacts: {
      email: "",
      phoneNumber: "",
    },
    image: null,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Fetch staff data from the API
    axios.get("http://localhost:3000/staff").then((response) => {
      setStaffData(response.data);
      console.log(response.data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Split the name attribute to identify nested properties
    const [fieldName, subFieldName] = name.split(".");

    if (subFieldName) {
      // If the name attribute contains a dot, it's a nested property (contacts.email or contacts.phoneNumber)
      setNewStaffMember((prevData) => ({
        ...prevData,
        contacts: {
          ...prevData.contacts,
          [subFieldName]: value,
        },
      }));
    } else {
      // If there's no dot in the name, it's a top-level property
      setNewStaffMember((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewStaffMember({
      ...newStaffMember,
      image: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("staffName", newStaffMember.staffName);
      formData.append("position", newStaffMember.position);
      formData.append("totalSales", newStaffMember.totalSales);
      formData.append("shift", newStaffMember.shift);
      formData.append("contacts[email]", newStaffMember.contacts.email);
      formData.append(
        "contacts[phoneNumber]",
        newStaffMember.contacts.phoneNumber
      );
      formData.append("staffImage", newStaffMember.image);

      // Send a POST request to add a new staff member
      const response = await axios.post(
        "http://localhost:3000/staff/add",
        formData
      );

      setStaffData([...staffData, response.data]);
      // Reset the form fields
      setNewStaffMember({
        staffName: "",
        position: "",
        totalSales: "",
        shift: "",
        contacts: {
          email: "",
          phoneNumber: "",
        },
        image: null,
      });
      // Hide the form after submission
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding staff member: ", error);
    }
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      // Send a DELETE request to delete the staff member by ID
      await axios.delete(`http://localhost:3000/staff/${staffId}`);

      // Update the state to remove the deleted staff member
      setStaffData((prevData) =>
        prevData.filter((staff) => staff._id !== staffId)
      );
    } catch (error) {
      console.error("Error deleting staff member: ", error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <header className="bg-white p-4 border-b border-gray-300 mt-8 shadow-xl">
        <h1 className="text-2xl font-bold text-black ml-8">Staff Profiles</h1>
      </header>
      <button
        className="p-2 w-36 m-4 bg-blue-500 text-white rounded"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Hide Form" : "Add Staff "}
      </button>
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <form
            onSubmit={handleSubmit}
            className="relative p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-lg font-bold mb-2">Add Staff Member</h2>
            <div className="mb-2">
              <label
                htmlFor="staffName"
                className="block text-gray-700 font-semibold"
              >
                Staff Name
              </label>
              <input
                type="text"
                id="staffName"
                name="staffName"
                value={newStaffMember.staffName}
                onChange={handleInputChange}
                placeholder="Staff Name"
                required
                className="w-full border border-gray-300 rounded py-1 px-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="position"
                className="block text-gray-700 font-bold"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={newStaffMember.position}
                onChange={handleInputChange}
                placeholder="Position"
                required
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="totalSales"
                className="block text-gray-700 font-bold"
              >
                Total Sales
              </label>
              <input
                type="text"
                id="totalSales"
                name="totalSales"
                value={newStaffMember.totalSales}
                onChange={handleInputChange}
                placeholder="Total Sales"
                required
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="shift" className="block text-gray-700 font-bold">
                Shift
              </label>
              <input
                type="text"
                id="shift"
                name="shift"
                value={newStaffMember.shift}
                onChange={handleInputChange}
                placeholder="Shift"
                required
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="contacts.email"
                value={newStaffMember.contacts.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="contacts.phoneNumber"
                value={newStaffMember.contacts.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Add Staff Member
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="bg-gray-400 text-white py-1 px-2 rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-500 text-sm"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 justify-center items-center">
        {staffData.map((staff, index) => (
          <div
            key={index}
            className="flex flex-col bg-white shadow-lg rounded-lg p-4 m-4"
          >
            <button
              onClick={() => handleDeleteStaff(staff._id)}
              className="text-red-700"
            >
              Delete
            </button>
            <div className="flex flex-row">
              <div className="w-1/3">
                <img
                  src={`http://localhost:3000/${staff.image}`}
                  alt={`Profile of ${staff.staffName}`}
                  className="w-32 h-32 mx-auto rounded-lg"
                />
              </div>
              <div className="w-2/3 p-4">
                <p className="text-gray-600 text-xs">ID: {staff._id}</p>
                <h1 className="text-3xl font-bold text-black">
                  {staff.staffName}
                </h1>
                <p className="text-gray-600">{staff.position}</p>
                <p className="text-gray-600">Shift: {staff.shift}</p>
              </div>
            </div>
            <div className="flex flex-col mt-4 h-full">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className=" font-bold">Date of Employment:</p>
                  <p>{new Date(staff.registrationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className=" font-bold">Total Sales:</p>
                  <p>{staff.totalSales}</p>
                </div>
                <div>
                  <p className=" font-bold">Contacts:</p>
                  {staff.contacts && staff.contacts.email ? (
                    <p>Email: {staff.contacts.email}</p>
                  ) : (
                    <p>Email not available</p>
                  )}
                  {staff.contacts && staff.contacts.phoneNumber ? (
                    <p>Phone: {staff.contacts.phoneNumber}</p>
                  ) : (
                    <p>Phone not available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Staff;
