import React from 'react';
import styled from "styled-components";

const PrimaryButton = styled.button`
padding: 5px 10px;
margin: 8px 5px 0px 0px;
border-bottom: 1px solid #ccc;
border-right: 1px solid #ccc;
border-radius: 4px;
box-shadow: 2px 2px 2px #D3D3D3;
background: white;
color: #45B39D;
font-weight: bold;
cursor: pointer;
`;

const Button = props => {
    return <PrimaryButton {...props}></PrimaryButton>
}

export default Button