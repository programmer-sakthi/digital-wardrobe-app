// Sidebar.js
import React from 'react';
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { FaHome, FaInfo, FaCog, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <useProSidebar>
      <SidebarHeader>
        <div style={{ padding: '20px', fontSize: '20px', fontWeight: 'bold' }}>
          My Sidebar
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaHome />}>Home</MenuItem>
          <MenuItem icon={<FaUser />}>Profile</MenuItem>
          <SubMenu title="Settings" icon={<FaCog />}>
            <MenuItem>Account</MenuItem>
            <MenuItem>Privacy</MenuItem>
          </SubMenu>
          <MenuItem icon={<FaInfo />}>About</MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px' }}>
          © 2024 Your Company
        </div>
      </SidebarFooter>
    </useProSidebar>
  );
};

export default Sidebar;
