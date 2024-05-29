import "./index.css";
import React from 'react';
import data from "./data.json";

type Node = {
  name: string;
  children?: Node[];
};

const addPeriods = (name:string, level:number) => {
  return name.charAt(0) + ".".repeat(level) + name.slice(1);
};

const renderTree = (node: Node, level=0) => (
  <div className="node">
    {addPeriods(node.name, level)}
    {node.children && (
      <div className="children">
        {node.children.map((child) => renderTree(child, level+1))}
      </div>
    )}
  </div>
);

const Tree = () => <div className="tree">{renderTree(data)}</div>;

export default Tree;
