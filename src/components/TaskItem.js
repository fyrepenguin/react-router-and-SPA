import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm'

const TaskItem = ({ task, onDelete, onUpdate, overDue = false }) => {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(null);

  const toggle = () => {
    setModal(!modal);
  }

  const handleStatus = (e) => {
    setStatus(prev => !prev);
  }

  const handleDelete = () => {
    onDelete(task.id)
  }
  useEffect(() => {
    setStatus(task.completed)
  }, [task])

  useEffect(() => {
    status !== null && onUpdate({ ...task, completed: status }, task.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <>
      <div>
        <div className="task-item">
          <div className="task-header">
            <div className="status-icon-container" onClick={handleStatus} >
              {status ? <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="completed-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> : <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle></svg>}
            </div><div onClick={() => setModal(!task.completed)}>
              <h4 className='task-item-title' style={{ textDecoration: status ? 'line-through' : 'none' }}>{task.title.length > 100 ? `${task.title.slice(0, 100)}...` : task.title}</h4>
              {task.description && <div className='task-item-description'>
                {task.description.length > 100 ? `${task.description.slice(0, 100)}...` : task.description}
              </div>}

              {task.deadline && <div className='task-item-deadline' style={{ color: overDue ? 'red' : 'initial' }}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>{' '}{new Date(task.deadline).toLocaleDateString()}
              </div>}
              {task.tags.length > 0 && <div>
                {task.tags.slice(0, 3).map(tag => <span className='tag-item' key={tag.id}>{tag.name}</span>)}
              </div>
              }
              {
                task.priority && <div className='task-item-priority'><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path></svg></div>
              }

            </div>
          </div>



          <div className='task-item-buttons-container'>
            {!task.completed && <button className='edit-button' onClick={() => setModal(true)}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
            </button>}
            <button onClick={handleDelete} className="delete-button" >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
            </button>
          </div>
        </div>

      </div>
      {modal && <TaskForm key={task.id} modal={modal}
        defaultTask={task} toggle={toggle} onUpdate={onUpdate} task={task} type="Edit" />}
    </>
  );
};

export default TaskItem;