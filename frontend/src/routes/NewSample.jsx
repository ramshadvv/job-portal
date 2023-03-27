import React, {useState} from 'react';

function NewSample() {
  const [count, setCount] = useState(1)
  const minus =()=>{
    setCount(count - 1)
  }
  const plus =()=>{
    setCount(count + 1)
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={plus}>plus</button>
      <button onClick={minus}>minus</button>
      
    </div>
  );
}

export default NewSample;
