import React from "react";
export default function Card(props) {
    return (
        <div className={`flex flex-row flex-1 items-center ${props.color} p-[16px] rounded-[8px] mr-[24px]`}>
           <div className="mr-[24px] text-[#fff]">{props.children}</div>
            <div className="flex flex-col">
                <div className="text-[28px] text-[#fff]">{props.num}</div>
                <div className="text-[28px] text-[#fff]">{props.title}</div>
            </div>
        </div>
    );
}
