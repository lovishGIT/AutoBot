import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

import ProjectCalendar from '../components/ProjectDetails/projectCalender';
import AddTicketModal from '../components/ProjectDetails/addTicket';
import CollapsibleSidebar from '../components/ProjectDetails/detailsSidebar';
import { ProjectProvider } from '../context/project.context';

const ProjectDetailsPage = () => {
    return (
        <ProjectProvider>
            <div className="bg-gray-900 min-h-screen flex">
                <CollapsibleSidebar />

                <div className="flex-1 ml-20 p-8 text-white transition-all duration-300">
                    <Suspense
                        fallback={
                            <div className="flex justify-center items-center h-screen">
                                <Loader2
                                    className="animate-spin text-white"
                                    size={48}
                                />
                            </div>
                        }
                    >
                        <div className="container mx-auto">
                            <AddTicketModal />
                            <ProjectCalendar />
                        </div>
                    </Suspense>
                </div>
            </div>
        </ProjectProvider>
    );
};

export default ProjectDetailsPage;
