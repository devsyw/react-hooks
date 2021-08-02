import React, { Component, useState } from 'react';

const contents = [
  {
    tab : "Section 1",
    content : "I'm the content of the Section 1"
  },
  {
    tab : "Section 2",
    content : "I'm the content of the Section 2"
  }
]

// const useInput = (val, valitate) => {
//   const [value, setValue] = useState(val);
//   const onChange = event => {
//     const {
//       target: { value }
//     } = event;
    
//     let willUpdate = true;

//     if(typeof valitate === "function") {
//       willUpdate = valitate(value);
//     }

//     if(willUpdate) {
//       setValue(value);
//     }
//   }
//   return { value, onChange };
// }

const useTabs = (initalTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initalTab);
  if(!allTabs || !Array.isArray(allTabs)) return;
  return {
    currentItem : allTabs[currentIndex],
    changeItem : setCurrentIndex
  };

}

const App = () => {
  //const maxLen2 = value => value.length <= 10; /* 입력범위 제한 */
  const maxLen = value => !value.includes("@"); /* 특수문제 제외 */

  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");

  const updateEmail = e => {
    const {target : {value}} = e;
    setEmail(value);
  }

  const { currentItem, changeItem } = useTabs(0, contents);

  return (
    <>
      {/* <input className="name-input" placeholder="name" {...name}/> <br/> */}
      {count} <br/>
      <button className="btn-blue" onaClick={ () => setCount(count + 1) }>inc</button>
      <button className="btn-blue" onClick={ () => setCount(count - 1) }>dec</button> <br/>
      <input className="mail-input" placeholder="Email" value={email} onChange={updateEmail}/>

      <div className="App">
        {contents.map((section, index) => (
          <button onClick={() => changeItem(index)}>{section.tab}</button>
        ))}
        <div>{currentItem.content}</div>
      </div>
    </>

  );
};

export default App;