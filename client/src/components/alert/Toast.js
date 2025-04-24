import React, { useEffect } from 'react';
 

const Toast = ({ msg, handleShow, bgColor, type }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            handleShow();
        }, 5000); // 5000ms = 5 segundos

        return () => clearTimeout(timer);
    }, [handleShow]);

    return (
        <div className={`toast show position-fixed text-light ${bgColor} ${type}`}
            style={{ top: '20px', right: '2px', minWidth: '250px', zIndex: 1000 }}>
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="mr-auto text-light">{msg.title}</strong>
                <button className="ml-2 mb-1 close text-light"
                    data-dismiss="toast" style={{ outline: 'none' }}
                    onClick={handleShow}>
                    &times;
                </button>
            </div>
            <div className="toast-body">
                {msg.body}
            </div>
        </div>
    );
};

export default Toast;