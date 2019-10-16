import React from 'react';
import {Link} from '@reach/router';

const Header = ({user}) => {
    return (
        <header className="Header">
            <Link to="/">NC News </Link>
            {user !== '' ?<> <Link to="#" onClick={() =>this.props.userHandler('')}>Log-Out</Link> <p>Logged in: {user}</p> </> :<> <Link to="/login">Login</Link> </>}
        </header>
    );
};

export default Header;