import React from "react";

export default function Content({children,props}) {
  return (
    <div className={props}>
      {children}
    </div>
  );
}
