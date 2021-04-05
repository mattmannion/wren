import React from 'react';

function Navbar() {

    // Logout function
    async function logout() {

        document.querySelector('#logout-btn')

        try {
            const response = await fetch('/api/users/logout', {
                method: 'post',
                headers: { 'Content-type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/')
            } else {
                alert(response.status);
            }
    
            console.log(response);

        } catch (err) {
            console.log(err.message);
        }
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/home">Home<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Two Link</a>
                </li>
                <li className="nav-item">
                    <a href="/user-info" className="nav-link">Settings</a>
                </li>
                <li className="nav-item">
                    <button type="button" id="logout-btn" className="btn btn-primary" onClick={logout}>Logout</button>
                </li>
            </ul>
        </div>
        </nav>

    );
}

export default Navbar;