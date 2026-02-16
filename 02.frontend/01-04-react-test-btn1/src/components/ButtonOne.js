const ButtonOne = ({ active, setActive, onButtonClick }) => {
  return (
    <button
      onClick={onButtonClick}
      onMouseEnter={() => {
        setActive((val) => !val);
      }}
    >
      {active ? "Пришел" : "Ушёл"}
    </button>
  );
};
export default ButtonOne;
