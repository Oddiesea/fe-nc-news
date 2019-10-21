import React from 'react';
import styled from "styled-components";

const PrimaryCard = styled.div`
margin-right: 10px;
padding: 5px 10px;
margin: 8px 5px;
border-bottom: 1px solid #ccc;
border-right: 1px solid #ccc;
border-radius: 4px;
box-shadow: 2px 2px 2px #D3D3D3;
background: white;
`;

const Card = props => {
    return <PrimaryCard {...props}></PrimaryCard>
}

export default Card