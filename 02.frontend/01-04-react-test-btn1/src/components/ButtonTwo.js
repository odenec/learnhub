const ButtonTwo = ({ active, setActive, onButtonClick }) => {
  return (
    <button
    onClick={onButtonClick}
      onMouseEnter={() => {
        setActive((val) => !val);
      }}
    >
      {active ? "Ушёл" : "Пришел"}
    </button>
  );
};
export default ButtonTwo;
