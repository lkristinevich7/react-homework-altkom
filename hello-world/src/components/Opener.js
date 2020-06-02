import React from 'react';
import { useState} from 'react';


const Opener = (props) => {

  const [opened, setOpened] = useState(true);

  const toggle = () => setOpened(!opened);

  return (<div className="card my-3">
    <div className="card-header" onClick={toggle}>
      {props.title}
    </div>

    {opened && <div className="card-body">
      {props.children}
    </div>}

  </div>);
};

export default Opener;
