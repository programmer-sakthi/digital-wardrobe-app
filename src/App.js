// App.js
import React from 'react';
import { ProSidebarProvider} from 'react-pro-sidebar';
import Sidebar from './Components/SideBar';

const App = () => {
  return (
    <ProSidebarProvider>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px' }}>
          {/* Main content goes here */}
          <h1>Welcome to the Dashboard</h1>
          <p>This is the main content area.</p>
        </main>
      </div>
    </ProSidebarProvider>
  );
};

export default App;
