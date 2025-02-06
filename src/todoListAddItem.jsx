export default function TodoListAddItem({ value, handleInputChange, addTask }) {
  const isValidInput = (input) => {
    const alphanumericRegex = /^[a-z0-9]+$/i;
    return alphanumericRegex.test(input) && input.length < 50;
  };

  return (
    <form className="input-group" onSubmit={(e) => {
      e.preventDefault();
      if (isValidInput(value)) {
        addTask();
      } else {
        alert("Input must be alphanumeric and less than 50 characters.");
      }
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