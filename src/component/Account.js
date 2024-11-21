import React from "react";
import guyhawkins from '../Assets/guyhawkins.jpg'

const Account = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen p-8">
      {/* Sidebar (Profile Card) */}
      <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-4"
            src={guyhawkins}
            alt="Profile"
          />
          <h2 className="text-lg font-bold">James Jones</h2>
          <p className="text-sm text-gray-500">Application Developer</p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Chat</button>
            <button className="bg-gray-200 px-4 py-2 rounded">Follow</button>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm text-gray-600 mb-2">
            <p>
              <strong>Email:</strong> matt@lifestudios.com
            </p>
            <p>
              <strong>Phone:</strong> 44(76)34254578
            </p>
            <p>
              <strong>Location:</strong> Melbourne
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            <li className="font-semibold text-blue-500">Profile Overview</li>
            <li className="text-gray-600">Personal Information</li>
            <li className="text-gray-600">Account Information</li>
            <li className="text-gray-600">Change Password</li>
            <li className="text-gray-600">Email Settings</li>
            <li className="text-gray-600">Saved Credit Cards</li>
            <li className="text-gray-600">Tax Information</li>
            <li className="text-gray-600">Statements</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 ml-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <p className="text-sm text-gray-500 mb-6">Update your personal information</p>

        {/* Form Section */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-2">Avatar</label>
            <div className="flex items-center">
              <img
                className="w-20 h-20 rounded-full mr-4"
                src={guyhawkins}
                alt="Avatar"
              />
              <button className="bg-gray-200 px-4 py-2 rounded text-sm">Change</button>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 mb-2">First Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Nick"
              value="Nick"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Last Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value="Bold"
              place="Bold"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Company Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value="Loop Inc."
              placeholder="Loop Inc."
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Contact Phone</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value="+35279853712"
              placeholder="+35279853712"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value="nick.bold@loop.com"
              placeholder="nick.bold@loop.com"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded">Cancel</button>
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
