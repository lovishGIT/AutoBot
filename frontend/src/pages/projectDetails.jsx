import React, { useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    Folder,
    CheckCircle,
    Clock,
    Users,
    TrendingUp,
    Briefcase,
    ArrowLeft,
} from 'lucide-react';
import ProjectSidebar from '@/components/Project/projectSidebar';
import {
    ProjectProvider,
    useProject,
} from '@/context/projects.context';
import { UserContext } from '@/context/user.context';

const ProjectDashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const { projects, isLoading, error } = useProject();
    const userProjects = useMemo(
        () => projects.filter((project) => project.owner === user.id),
        [projects, user.id]
    );
    const others = useMemo(
        () => projects.filter((project) => project.owner !== user.id),
        [projects, user.id]
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const statusData = [
        {
            name: 'In Progress',
            value: userProjects.filter(
                (p) => p.status === 'In Progress'
            ).length,
        },
        {
            name: 'Completed',
            value: userProjects.filter(
                (p) => p.status === 'Completed'
            ).length,
        },
        {
            name: 'Ongoing',
            value: userProjects.filter((p) => p.status === 'Ongoing')
                .length,
        },
    ];

    const progressData = userProjects.map((project) => ({
        name: project.name,
        progress: project.progress,
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const handleBackButton = () => {
        navigate('/', {
            replace: true,
            preventScroll: true,
        });
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8 pl-72">
            <ProjectProvider>
                <ProjectSidebar />
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-gray-100 flex items-center">
                        <button
                            className=""
                            onClick={handleBackButton}
                        >
                            <ArrowLeft className="w-6 h-6 mr-2" />
                        </button>
                        Project Dashboard
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Professional Projects Section */}
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <Briefcase className="mr-2 text-blue-500" />
                                <h2 className="text-xl font-semibold">
                                    Professional Projects
                                </h2>
                            </div>
                            {others.length > 0 ? (
                                others.map((project) => (
                                    <Link
                                        to={`/project/${project.id}`}
                                        key={project.id}
                                        className="block"
                                    >
                                        <div className="bg-gray-700 rounded-md p-4 mb-4 hover:bg-gray-600 transition">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium">
                                                    {project.name}
                                                </h3>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        project.status ===
                                                        'Completed'
                                                            ? 'bg-green-600'
                                                            : 'bg-blue-600'
                                                    }`}
                                                >
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="mt-2">
                                                <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                    <span>
                                                        Progress
                                                    </span>
                                                    <span>
                                                        {
                                                            project.progress
                                                        }
                                                        %
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-600 rounded-full h-2.5">
                                                    <div
                                                        className="bg-blue-500 h-2.5 rounded-full"
                                                        style={{
                                                            width: `${project.progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex justify-between text-sm">
                                                <div className="flex items-center">
                                                    <Users className="w-4 h-4 mr-1 text-gray-400" />
                                                    <span>
                                                        {project.team}{' '}
                                                        team members
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                                                    <span>
                                                        {
                                                            project.deadline
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No professional projects found.</p>
                            )}
                        </div>

                        {/* Your Projects Section */}
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <Folder className="mr-2 text-green-500" />
                                <h2 className="text-xl font-semibold">
                                    Your Projects
                                </h2>
                            </div>
                            {userProjects.length > 0 ? (
                                userProjects.map((project) => (
                                    <Link
                                        to={`/project/${project.id}`}
                                        key={project.id}
                                        className="block"
                                    >
                                        <div className="bg-gray-700 rounded-md p-4 mb-4 hover:bg-gray-600 transition">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium">
                                                    {project.name}
                                                </h3>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        project.status ===
                                                        'Completed'
                                                            ? 'bg-green-600'
                                                            : 'bg-blue-600'
                                                    }`}
                                                >
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="mt-2">
                                                <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                    <span>
                                                        Progress
                                                    </span>
                                                    <span>
                                                        {
                                                            project.progress
                                                        }
                                                        %
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-600 rounded-full h-2.5">
                                                    <div
                                                        className="bg-green-500 h-2.5 rounded-full"
                                                        style={{
                                                            width: `${project.progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex justify-end text-sm">
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                                                    <span>
                                                        {
                                                            project.deadline
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No personal projects found.</p>
                            )}
                        </div>

                        {/* Project Progress Chart */}
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <TrendingUp className="mr-2 text-purple-500" />
                                <h2 className="text-xl font-semibold">
                                    Project Progress
                                </h2>
                            </div>
                            <BarChart
                                width={500}
                                height={300}
                                data={progressData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <XAxis
                                    dataKey="name"
                                    stroke="#ffffff"
                                />
                                <YAxis stroke="#ffffff" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#333',
                                        color: '#fff',
                                    }}
                                    itemStyle={{
                                        color: '#fff',
                                    }}
                                />
                                <Bar
                                    dataKey="progress"
                                    fill="#8884d8"
                                />
                            </BarChart>
                        </div>

                        {/* Project Status Distribution */}
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <div className="flex items-center mb-4">
                                <CheckCircle className="mr-2 text-yellow-500" />
                                <h2 className="text-xl font-semibold">
                                    Project Status
                                </h2>
                            </div>
                            <PieChart width={500} height={300}>
                                <Pie
                                    data={statusData}
                                    cx={250}
                                    cy={150}
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index %
                                                            COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#333',
                                        color: '#fff',
                                    }}
                                    itemStyle={{
                                        color: '#fff',
                                    }}
                                />
                                <Legend
                                    iconType="circle"
                                    wrapperStyle={{
                                        color: '#fff',
                                    }}
                                />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </ProjectProvider>
        </div>
    );
};

export default ProjectDashboard;
