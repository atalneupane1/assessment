import "./index.css";

import React, { useEffect, useState } from "react";
import { getTreeData, saveTreeData } from "./api";

import data from "./data.json";

type Node = {
  name: string;
  children?: Node[];
};

const addPeriods = (name:string, level:number) => {
  return name.charAt(0) + ".".repeat(level) + name.slice(1);
};

const alphabetizeTree = (node: Node) => {
  if (node.children) {
    node.children.sort((a, b) => a.name.localeCompare(b.name));
    node.children.forEach(alphabetizeTree);
  }
};

const renderTree = (
  node: Node,
  addNode: Function,
  removeNode: Function,
  indexNo: number,
  level = 0
) => (
  <div className="node" key={node.name+indexNo}>
    {addPeriods(node.name, level)}
    <button onClick={() => removeNode(node)}>❌</button>
    {node.children && (
      <div className="children">
        {node.children.map((child, index) =>
          renderTree(child, addNode, removeNode, index,  level + 1)
        )}
        <input
          className="children"
          type="text"
          placeholder="Add child"
          onKeyDown={(e) => addNode(e, node)}
        />
      </div>
    )}
  </div>
);

const Tree = () => {
  const [treeData, setTreeData] = useState(null);
  const [isAlphabetized, setIsAlphabetized] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTreeData();
      setTreeData(data);
      setOriginalData(data);
    };
    fetchData();
  }, []);

  const toggleAlphabetize = () => {
    if (isAlphabetized) {
      setTreeData(JSON.parse(JSON.stringify(originalData)));
      setIsAlphabetized(false);
    } else {
      const newTreeData = JSON.parse(JSON.stringify(originalData));
      alphabetizeTree(newTreeData);
      setTreeData(newTreeData);
      setIsAlphabetized(true);
    }
  };

  const addNode = async (e: any, parentNode: Node) => {
    if (e.key === "Enter") {
      const newName = e.target.value;
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push({ name: newName });
      await saveTreeData(treeData);
      setTreeData({ ...treeData });
      e.target.value = "";
    }
  };

  const removeNode = async (node: Node) => {
    const findAndRemove = (parent: Node, name: string) => {
      parent.children = parent?.children?.filter((child) => child.name !== name);
      parent?.children?.forEach((child) => findAndRemove(child, name));
    };
    findAndRemove(treeData, node.name);
    await saveTreeData(treeData);
    setTreeData({ ...treeData });
  };

   if (!treeData) {
     return <div>Loading...</div>;
   }
   
  return (
    <div className="tree">
      <button onClick={toggleAlphabetize}>
        {isAlphabetized ? "Restore Original Order" : "Alphabetize"}
      </button>
      {renderTree(treeData, addNode, removeNode, 0)}
    </div>
  );
}

export default Tree;