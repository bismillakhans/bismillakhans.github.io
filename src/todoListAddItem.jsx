export default function TodoListAddItem({ value, handleInputChange, addTask }) {
  return (
    <form className="input-group" onSubmit={(e) => {
      e.preventDefault();
      addTask();
    }}>
      <input 
        type="text" 
        className="input" 
        placeholder="Enter the item..." 
        value={value} 
        onChange={handleInputChange}
      />
      <button type="submit" className="add-button">
        ADD
      </button>
    </form>
  );
}