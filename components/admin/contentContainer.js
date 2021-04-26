import React from "react";

export default function ContentContainer({left, right}) {
    return (
        <div style={{display: 'flex', width: '100%'}}>
            <div style={{
                display: "flex",
                width: "30%"
            }}>
                {left}
            </div>
            <div style={{
                display: "flex",
                width: "70%"
            }}>
                {right}
            </div>
        </div>
    )
}