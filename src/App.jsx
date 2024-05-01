import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  console.log(numberAllowed);

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "0123456789";
    let character = "!@#$%^&*_-+=?/|~`:;";

    if (numberAllowed) str += num;
    if (characterAllowed) str += character;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenrator();
  }, [length, numberAllowed, characterAllowed, passwordGenrator]);

  return (
    <main className="bg-black h-[100vh] py-8">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white my-3">Password Genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full outline-none py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={18}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="charInput"
              onChange={() => setCharacterAllowed(!characterAllowed)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
