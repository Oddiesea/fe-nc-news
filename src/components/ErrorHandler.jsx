import React from 'react';
import styled from "styled-components";

const ErrorHandler = () => {
    const {state} = window.history
    const Header = styled.p`
    font-size: 2em;
    padding: 5em;
    text-align: center;
    `
    const msg = state? state.msg : "Sorry. Page not found."
    return (
        <div>
            <Header>{msg}</Header>
        </div>
    );
};

export default ErrorHandler;