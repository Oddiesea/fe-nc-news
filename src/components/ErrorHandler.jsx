import React from 'react';

const ErrorHandler = () => {
    const {state} = window.history
    const msg = state? state.msg : "Sorry. Page not found."
    return (
        <div>
            <h2>{msg}</h2>
        </div>
    );
};

export default ErrorHandler;