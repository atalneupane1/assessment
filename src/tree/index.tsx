import "./index.css";
import React from 'react';
import data from "./data.json";

type Node = {
  name: string;
  children?: Node[];
};

const renderTree = (node: Node) => (
  <div className="node">
    {node.name}
    {node.children && (
      <div className="children">
        {node.children.map((child) => renderTree(child))}
      </div>
    )}
  </div>
);

const Tree = () => <div className="tree">{renderTree(data)}</div>;

export default Tree;
