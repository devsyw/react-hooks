import React, { Component, useEffect, useRef, useState } from "react";
import useAxios from "./useAxios";

const contents = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1",
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2",
  },
];

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

// const useTabs = (initalTab, allTabs) => {
//   const [currentIndex, setCurrentIndex] = useState(initalTab);
//   if(!allTabs || !Array.isArray(allTabs)) return;
//   return {
//     currentItem : allTabs[currentIndex],
//     changeItem : setCurrentIndex
//   };
// }

/* useState */
// const App = () => {
//   //const maxLen2 = value => value.length <= 10; /* 입력범위 제한 */
//   const maxLen = value => !value.includes("@"); /* 특수문제 제외 */

//   const [count, setCount] = useState(0);
//   const [email, setEmail] = useState("");

//   const updateEmail = e => {
//     const {target : {value}} = e;
//     setEmail(value);
//   }

//   const { currentItem, changeItem } = useTabs(0, contents);

//   return (
//     <>
//       {/* <input className="name-input" placeholder="name" {...name}/> <br/> */}
//       {count} <br/>
//       <button className="btn-blue" onaClick={ () => setCount(count + 1) }>inc</button>
//       <button className="btn-blue" onClick={ () => setCount(count - 1) }>dec</button> <br/>
//       <input className="mail-input" placeholder="Email" value={email} onChange={updateEmail}/>

//       <div className="App">
//         {contents.map((section, index) => (
//           <button onClick={() => changeItem(index)}>{section.tab}</button>
//         ))}
//         <div>{currentItem.content}</div>
//       </div>
//     </>

//   );
// };

/* useEffect, useTitle */
/*
const useTitle = (initialTitle) => {
   const [title, setTitle] = useState(initialTitle);
   const updateTitle = () => {
     const htmlTitle = document.querySelector("title");
     htmlTitle.innerText = title;
   };
   useEffect(updateTitle, [title]);
   return setTitle;
 }

const App = () => {
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => {
    titleUpdater("Home");
  }, 5000);
  return (
    <div className="App">
      <div>Hi</div>
    </div>
  );
}
*/

/* useClick */
/*
const useClick = onClick => {
  const element = useRef();

  useEffect(() => {
    if(element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if(element.current) {
        element.current.removeEventListener("click", onClick);
      }
    }
  }, []);

  if(typeof onClick !== "function") {
    return;
  }

  return element;
}
*/
/* useRef */
/*
const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);

  return (
    <div className="App">
      <div ref={title}>Hi</div>
    </div>
  );
}
*/

/* useConfirm */
/*const useConfirm = (message, callback, reject) => {
  if (typeof callback !== "function") {
    return;
  }

  const confirmAction = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(message)) {
      callback();
    } else {
      reject();
    }
  };

  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("자신이따");
  const unDeleteWorld = () => console.log("자신음따");
  const abort = () => console.log("abort");
  const clickConfirm = useConfirm("마 자신있나", deleteWorld, unDeleteWorld);

  return (
    <div className="App">
      <button onClick={clickConfirm}>Hi</button>
    </div>
  );
};
*/
 /* usePreventLeave */
 /*
const usePreventLeave = () => {
  const listener = event => {
    event.preventDefault();
    event.returnValue = "";
  }
  const enablePrevent = () => window.addEventListener("beforeload");
  const disabledPrevent = () => window.addEventListener("beforeunload", listener);
  return {enablePrevent, disabledPrevent};
}

const App = () => {
  const {enablePrevent, disabledPrevent} = usePreventLeave();
  //const test = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disabledPrevent}>unProtect</button>
    </div>
  );
};
*/
/*
const useBeforeLeave = () => {
  const handle = () => {
    console.log("leaving");
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => {
      document.removeEventListener("mouseleave", handle);
    }
  }, []);
};
*/

/* useNotification */
/*
const useNotification = (title, options) => {
  if(!("Notification" in window)) {
      return;
  }
  const fireNotif = () => {
      if(Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
          if(permission === "granted") {
            new Notification(title,options);
          } else {
            return;
          }
        })
      } else {
        new Notification(title, options);
      }
  };
  return fireNotif;
};

const App = () => {
  const triggerNotif = useNotification("Can I steal your kimchi?", {body: "I casass"});
  return (
    <div className="App">
      <button onClick={triggerNotif}>hissss</button>
    </div>
  );
};
*/

const App = () => {
  const {Loading, data, error, refetch} = useAxios({
    url : "https://yts.mx/api/v2/list_movies.json"
  });
  console.log(`Loading: ${Loading}\nError: ${error}\nData: ${JSON.stringify(data)}`);

  return (
    <div className="App">
      <h1>{data && data.useState}</h1>
      <h2>{Loading && "Loading"}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

export default App;
