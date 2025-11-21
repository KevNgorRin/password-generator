import { useEffect, useRef, useState } from "react";
import "./App.scss";
import { SvgMinus, SvgPaste, SvgPlus } from "./Icons";
import useRandom from "./useRandom";

export default function App() {
  let [password, setPassword] = useState(""),
    [copied, setCopied] = useState(false),
    [length, setLength] = useState(20),
    [lowercase, setLowercase] = useState(true),
    [uppercase, setUppercase] = useState(true),
    [numbers, setNumbers] = useState(true),
    [symbols, setSymbols] = useState(true),
    inputPassword = useRef();

  const generatePassword = (config) => {
    setPassword(
      useRandom(config || { length, lowercase, uppercase, numbers, symbols })
    );
    copied && setCopied(false);
  };

  const decreaseLength = (event) => {
    event.preventDefault();
    length > 3 && setLength((lastLength) => lastLength - 1);
  };

  const increaseLength = (event) => {
    event.preventDefault();
    length < 100 && setLength((lastLength) => lastLength + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generatePassword();
  };

  const handleCopy = () =>
    !copied &&
    navigator.clipboard.writeText(password).then(() => setCopied(true));

  const selectPassword = () => {
    inputPassword.current.select();
    handleCopy();
  };

  const getConfig = () => {
    let config = localStorage.getItem("pass-gen-config");
    return config ? JSON.parse(config) : false;
  };

  const saveConfig = () =>
    localStorage.setItem(
      "pass-gen-config",
      JSON.stringify({ length, lowercase, uppercase, numbers, symbols })
    );

  useEffect(() => {
    let savedConfig = false;
    if (password.length === 0) {
      savedConfig = getConfig();
      if (savedConfig) {
        setLength(savedConfig.length);
        setLowercase(savedConfig.lowercase);
        setUppercase(savedConfig.uppercase);
        setNumbers(savedConfig.numbers);
        setSymbols(savedConfig.symbols);
      }
    } else {
      saveConfig();
    }
    generatePassword(savedConfig);
  }, [length, lowercase, uppercase, numbers, symbols]);

  let configCheckboxes = [
    ["lowercase", "Lowercase letters", lowercase, setLowercase],
    ["uppercase", "Uppercase letters", uppercase, setUppercase],
    ["numbers", "Numbers", numbers, setNumbers],
    ["symbols", "Symbols", symbols, setSymbols],
  ];

  return (
    <main className="main-container">
      <div className="app-container">
        <h1>Password Generator</h1>
        <div className="password-container">
          <input
            type="text"
            className="password"
            value={password}
            ref={inputPassword}
            onClick={selectPassword}
            readOnly
          />
          <button className={copied ? "copied" : ""} onClick={handleCopy}>
            <SvgPaste />
          </button>
        </div>
        <form action="#" className="config-container" onSubmit={handleSubmit}>
          <div className="length-container">
            <button
              className="decrease"
              onClick={decreaseLength}
              disabled={length === 3}
            >
              <SvgMinus />
            </button>
            <div className="length">{length}</div>
            <button
              className="increase"
              onClick={increaseLength}
              disabled={length === 100}
            >
              <SvgPlus />
            </button>
          </div>
          {configCheckboxes.map((checkbox, index) => (
            <div className="input-container" key={"checkbox-" + index}>
              <label htmlFor={checkbox[0]}>{checkbox[1]}</label>
              <input
                type="checkbox"
                name={checkbox[1]}
                id={checkbox[1]}
                checked={checkbox[2]}
                onChange={(event) => checkbox[3](event.target.checked)}
              />
            </div>
          ))}
          <input type="submit" value="Generate" />
        </form>
        <a href="https://kevngorrin.github.io/" target="_blank">
          <h6>© Made and designed by KevNgorRin.</h6>
        </a>
      </div>
    </main>
  );
}
