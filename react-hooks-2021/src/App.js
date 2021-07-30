import React, { Component, useState } from 'react';

const useInput = (val, valitate) => {
  const [value, setValue] = useState(val);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    
    let willUpdate = true;

    if(typeof valitate === "function") {
      willUpdate = valitate(value);
    }

    if(willUpdate) {
      setValue(value);
    }
  }
  return { value, onChange };
}

const App = () => {
  const maxLen2 = value => value.length <= 10; /* 입력범위 제한 */
  const maxLen = value => !value.includes("@"); /* 특수문제 제외 */

  const name = useInput("Mr.", maxLen);

  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");

  const updateEmail = e => {
    const {target : {value}} = e;
    setEmail(value);
  }

  return (
    <>
      <input placeholder="name" {...name}/> <br/>
      {count} <br/>
      <button onClick={ () => setCount(count + 1) }>inc</button>
      <button onClick={ () => setCount(count - 1) }>dec</button> <br/>
      <input placeholder="Email" value={email} onChange={updateEmail}/>
    </>
  );
};

export default App;