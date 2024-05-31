import React from "react";

const Item = ({ id }) => {
    return (
        <div id={`${id}`}>
            <div className="container">
                <div className="row demo-2">
                    <h2 className="trigger-headline trigger-headline--hidden"><span>M</span><span>o</span><span>t</span><span>i</span><span>o</span><span>n</span></h2>
                    <div style={{ height: "300px" }} />
                </div>
            </div>
        </div>
    );
}

export default Item;