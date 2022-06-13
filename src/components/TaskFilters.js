import React, { useEffect, useState } from 'react'
import tags from '../data/tags.json';

const TaskFilters = ({ tasks, setSortedTasks }) => {
  const options = [{
    value: 'all',
    label: 'All'
  }, {
    value: 'completed',
    label: 'Completed'
  },]
  // eslint-disable-next-line
  const [filters, setFilters] = useState({
    status: null,
    tags: []
  });
  // eslint-disable-next-line
  const [sortOrder, setSortOrder] = useState({ value: 'desc', label: 'Desc' });
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const sortTasksByStatus = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1
      } else if (!a.completed && b.completed) {
        return -1
      } else {
        return 0
      }
    })
  }

  const sortTasksByPriority = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.priority && !b.priority) {
        return -1
      } else if (!a.priority && b.priority) {
        return 1
      } else {
        return 0
      }
    })
  }
  const sortTasksByCreatedAt = (tasks) => {
    // sort based on sort order
    return tasks.sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      if (sortOrder.value === "asc") {

        return aDate - bDate;
      } else if (sortOrder.value === "desc") {
        return bDate - aDate;
      }
      return 0
    })
  }

  const sortTasks = (tasks) => {
    return sortTasksByStatus(sortTasksByPriority(sortTasksByCreatedAt(tasks)))
  }



  useEffect(() => {
    const filteredTasksWithStatus = tasks.filter(task => {
      if (filters.status?.value === 'completed') {
        return task.completed
      }
      return true
    })
    if (filters.tags.length > 0) {
      const selectTags = filters.tags.map(({ value }) => value);
      const filteredWithTags = filteredTasksWithStatus.filter(({ tags }) =>
        tags.length > 0);

      const filtered = filteredWithTags.filter(({ tags }) => {
        return tags.some(tag => selectTags.includes(tag.name));
      });
      setFilteredTasks(filtered);
      return;
    }
    setFilteredTasks(filteredTasksWithStatus);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, tasks])

  useEffect(() => {
    const sorted = sortTasks(filteredTasks)
    setSortedTasks([...sorted])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTasks, sortOrder])



  return (
    <div className='status-filter'>
      <h4>Filters: </h4>
      <div>
        <label htmlFor="filter"> By Status:</label>
        <select>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter"> By Tags:</label>
        <select
          name="tags"
        >
          {tags.map(tag => (
            <option key={tag.name} value={tag.name}>{tag.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter">Sort By:</label>
        <select
          name="sort"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  )
}

export default TaskFilters