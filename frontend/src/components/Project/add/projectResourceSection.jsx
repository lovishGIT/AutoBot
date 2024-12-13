import React from 'react';
import {
    BookOpen,
    ChevronDown,
    ChevronUp,
    FileText,
    FileInput,
    Plus,
    X,
} from 'lucide-react';

export const ProjectResourcesSection = ({
    isOpen,
    onToggle,
    resources,
    resourceTexts,
    isFile,
    onAddResource,
    onRemoveResource,
    onResourceChange,
    onResourceTypeToggle,
}) => {
    return (
        <div className="mb-4">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={onToggle}
            >
                <label className="text-sm font-medium text-gray-300 flex items-center">
                    <BookOpen className="mr-2 text-purple-500" />
                    Project Resources
                </label>
                {isOpen ? (
                    <ChevronUp className="text-gray-400" />
                ) : (
                    <ChevronDown className="text-gray-400" />
                )}
            </div>

            {isOpen && (
                <div className="mt-4 space-y-3">
                    {resources.map((resource, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    onResourceTypeToggle(index)
                                }
                                className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
                            >
                                {!isFile[index] ? (
                                    <FileText className="w-5 h-5 text-blue-400" />
                                ) : (
                                    <FileInput className="w-5 h-5 text-green-400" />
                                )}
                            </button>

                            {!isFile[index] ? (
                                <input
                                    type="text"
                                    value={resourceTexts[index]}
                                    onChange={(e) =>
                                        onResourceChange(
                                            index,
                                            e.target.value,
                                            'text'
                                        )
                                    }
                                    className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter resource description"
                                />
                            ) : (
                                <div className="flex-grow">
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            onResourceChange(
                                                index,
                                                e.target.files[0],
                                                'file'
                                            )
                                        }
                                        className="block w-full text-sm text-white
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-blue-500 file:text-white
                                            hover:file:bg-blue-600"
                                    />
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    onRemoveResource(index)
                                }
                                className="p-2 bg-red-600 hover:bg-red-700 rounded-md transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={onAddResource}
                        className="w-full flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 rounded-md transition"
                    >
                        <Plus className="mr-2" /> Add Resource
                    </button>
                </div>
            )}
        </div>
    );
};
