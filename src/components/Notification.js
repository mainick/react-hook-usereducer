import React, { useEffect } from "react";

const Notification = ({ text, closeNotice }) => {
    useEffect(() => {
        setTimeout(() => {
            closeNotice();
        }, 3000);
    });

    return (
        <div>
            <p>{text}</p>
        </div>
    );
};

export default Notification;
