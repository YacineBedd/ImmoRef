import React from 'react';
import { FiClock, FiAlertCircle } from 'react-icons/fi';

const TaskList = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50">
          <div className="flex-shrink-0 mt-0.5">
            <FiClock className="text-warning" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-800">{task.title}</p>
            <p className="text-xs text-gray-500">{task.dossier}</p>
          </div>
          <div className="ml-2 flex-shrink-0 flex items-center">
            <span className={`px-2 py-1 text-xs rounded-full ${task.deadline === 'Aujourd\'hui' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-warning bg-opacity-10 text-warning'}`}>
              {task.deadline}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
