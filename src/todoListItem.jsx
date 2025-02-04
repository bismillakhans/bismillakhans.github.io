export default function TodoListItem({ task,deleteTask,updateTask,taskId }) {
  return (
    <>
      <div className="item">
        <span className="item-text">{task}</span>
        <div className="item-actions">
          <button className="delete-button" onClick={()=> deleteTask(taskId)}>Delete</button>
          <button className="update-button" onClick={()=>updateTask(taskId)}>Update</button>
        </div>
      </div>
    </>
  );
}
