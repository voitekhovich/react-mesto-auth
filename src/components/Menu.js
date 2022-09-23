import React from "react";

export default function Menu(props) {

  return (
    <ul className='menu menu_hidden'>
        {props.children}
    </ul>
  )
}

