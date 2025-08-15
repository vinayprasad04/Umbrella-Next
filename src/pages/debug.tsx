import React, { useEffect, useState } from 'react';

const Debug = () => {
  const [storageData, setStorageData] = useState<any>({});

  useEffect(() => {
    const data = {
      loggedIn: localStorage.getItem('loggedIn'),
      userToken: localStorage.getItem('userToken'),
      userName: localStorage.getItem('userName'),
      userEmail: localStorage.getItem('userEmail'),
      userId: localStorage.getItem('userId'),
      userRole: localStorage.getItem('userRole'),
      refreshToken: localStorage.getItem('refreshToken'),
      tokenExpiry: localStorage.getItem('tokenExpiry'),
      lastActivity: localStorage.getItem('lastActivity'),
    };
    setStorageData(data);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug - localStorage Data</h1>
      <div className="bg-gray-100 p-4 rounded">
        <pre>{JSON.stringify(storageData, null, 2)}</pre>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Refresh Data
        </button>
        
        <button 
          onClick={() => {
            localStorage.clear();
            alert('localStorage cleared');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear localStorage
        </button>
      </div>
    </div>
  );
};

export default Debug;