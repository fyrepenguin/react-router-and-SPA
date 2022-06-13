import React, { useState, useEffect } from 'react';
// import { FcAddImage } from 'react-icons/fc';
import tags from '../data/tags.json';

const TaskForm = ({ modal, toggle, task: taskData, defaultTask, type = "Create" }) => {
  const [task, setTask] = useState({ ...defaultTask });

  useEffect(() => {
    if (taskData) {
      setTask(taskData)
    }
  }, [taskData])

  return (
    <div>
      <div className={`modal ${modal ? 'open' : ''}`} id="modal">
        <div className="modal-content">
          <button onClick={toggle} className="modal-close" title="Close Modal">X</button>
          <h3>{type} Task</h3>
          <div className="modal-area">
            <div className='modal-body'>
              <div className='modal-form'>
                <div className="form-group" >
                  <label htmlFor={`title-${task.id}`}>
                    Task
                  </label>
                  <input id={`title-${task.id}`} type="text" name="title" />
                </div>
                <div className="form-group" >
                  <label htmlFor={`deadline-${task.id}`}>Deadline</label>
                  <input type="datetime" name="deadline" id={`deadline-${task.id}`} />
                </div>
                <div className="form-group" >
                  <label htmlFor={`description-${task.id}`}>
                    Description
                  </label>
                  <textarea
                    id={`description-${task.id}`}
                    name="description" />
                </div>
                <div className="form-group priority-input-container">
                  <label htmlFor={`priority-${task.id}`}>
                    <input type="checkbox" id={`priority-${task.id}`} name="priority" /> Priority
                  </label>
                </div>

                <div className='form-group'>
                  <label htmlFor={`tags-${task.id}`}>
                    Tags
                  </label>
                  <div>
                    <select name="tags" id={`tags-${task.id}`}>
                      {tags.map(tag => (
                        <option key={tag.id}>{tag.name}</option>
                      ))}
                    </select>
                  </div>


                </div>
                <div className="form-group" >
                  Image
                  <label htmlFor={`image-${task.id}`} className="image-input-label">
                    {task.image.length > 0 ? <img src={task.image} alt="" width="200" /> : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" fontSize="50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="#8CBCD6" d="M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"></path><circle fill="#B3DDF5" cx="35" cy="16" r="3"></circle><polygon fill="#9AC9E3" points="20,16 9,32 31,32"></polygon><polygon fill="#B3DDF5" points="31,22 23,32 39,32"></polygon><circle fill="#43A047" cx="38" cy="38" r="10"></circle><g fill="#fff"><rect x="36" y="32" width="4" height="12"></rect><rect x="32" y="36" width="12" height="4"></rect></g></svg>}
                  </label>
                  <input
                    id={`image-${task.id}`}
                    className='input-image'
                    name="image"
                    accept="image/*"
                    type="file"
                  />
                </div>

              </div>
              <footer>
                <button className="primary">{type === "Create" ? "Create" : "Update"}</button>
                <button className="secondary" onClick={toggle}>Cancel</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;