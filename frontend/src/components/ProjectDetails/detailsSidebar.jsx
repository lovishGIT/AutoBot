import React, { useState } from 'react';
import {
    Menu,
    Home,
    Calendar,
    Settings,
    ChevronLeft,
    ChevronRight,
    Trello,
    Users,
} from 'lucide-react';

const CollapsibleSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const SidebarItem = ({ icon: Icon, text, active }) => (
        <div
            className={`
        flex items-center
        ${isCollapsed ? 'justify-center' : 'justify-start'}
        p-3
        hover:bg-gray-700
        cursor-pointer
        ${active ? 'bg-blue-700' : ''}
      `}
        >
            <Icon size={20} className="mr-3" />
            {!isCollapsed && (
                <span className="text-white">{text}</span>
            )}
        </div>
    );

    return (
        <div
            className={`
        bg-gray-800
        h-screen
        fixed
        left-0
        top-0
        transition-all
        duration-300
        z-40
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
        >
            {/* Collapse/Expand Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="
          absolute
          top-4
          right-0
          transform
          translate-x-1/2
          bg-blue-600
          p-2
          rounded-full
          z-50
        "
            >
                {isCollapsed ? (
                    <ChevronRight size={20} />
                ) : (
                    <ChevronLeft size={20} />
                )}
            </button>

            {/* Logo/Brand */}
            <div
                className={`
          flex
          items-center
          justify-center
          h-16
          border-b
          border-gray-700
          ${isCollapsed ? 'flex-col' : 'flex-row'}
        `}
            >
                <Trello size={30} className="text-blue-500 mr-3" />
                {!isCollapsed && (
                    <h2 className="text-white text-xl font-bold">
                        ProTrack
                    </h2>
                )}
            </div>

            {/* Sidebar Navigation */}
            <nav className="mt-8">
                <SidebarItem icon={Home} text="Dashboard" active />
                <SidebarItem icon={Calendar} text="Projects" />
                <SidebarItem icon={Users} text="Team" />
                <SidebarItem icon={Settings} text="Settings" />
            </nav>
        </div>
    );
};

export default CollapsibleSidebar;
