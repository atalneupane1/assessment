import "./index.css";

const Tree = () => {
  return (
    <div className="tree">
      root
      <div className="children">
        <div className="node">ant</div>
        <div className="node">
          bear
          <div className="children">
            <div className="node">cat</div>
            <div className="node">
              dog
              <div className="children">
                <div className="node">elephant</div>
              </div>
            </div>
          </div>
        </div>
        <div className="node">
          frog
          <div className="children">
            <div className="node">dolphin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tree;
