import "./index.css";
import React from 'react';

const Tree = () => {
  return (
    <div className="tree">
      1 root
      <div className="children">
        <div className="node">1.1 ant</div>
        <div className="node">
          1.2 bear
          <div className="children">
            <div className="node">1.2.1 cat</div>
            <div className="node">
              1.2.2 dog
              <div className="children">
                <div className="node">1.2.2.1 elephant</div>
              </div>
            </div>
          </div>
        </div>
        <div className="node">
          1.3 frog
          <div className="children">
            <div className="node">1.3.1 dolphin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tree;
