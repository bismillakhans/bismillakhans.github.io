export default function TodoListUpdateItem({ value, handleInputChange, updateSaveTask }) {
  return (
    <form className="input-group" onSubmit={(e) => {
      e.preventDefault();
      updateSaveTask();
    }}>
      <input 
        type="text" 
        className="input" 
        placeholder="Enter the item..." 
        value={value} 
        onChange={handleInputChange}
      />
      <button type="submit" className="add-button">
        Save
      </button>
    </form>
  );
}