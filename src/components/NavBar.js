import React from 'react'
import { Outlet, Link } from "react-router-dom";

const NavBar = (props) => {
  const deactive = () => {
    let links = document.getElementsByClassName('nav-link')
    for (let i = 0; i < links.length; i++) {
      if (links[i].classList.contains('active')) {
        links[i].classList.remove('active')
      }
    }
  }

  const setActive = (event) => {
    deactive()
    event.target.classList.add('active')
  }

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">New Feed</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item" onClick={setActive}>
                      <Link className="nav-link active" to="/">Sports</Link>
                    </li>
                    <li className="nav-item" onClick={setActive}>
                      <Link className="nav-link" to="/Cricket">Cricket</Link>
                    </li>
                    <li className="nav-item" onClick={setActive}>
                      <Link className="nav-link" to="/Football">Football</Link>
                    </li>
                    <li className="nav-item" onClick={setActive}>
                      <Link className="nav-link" to="/Tennis">Tennis</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        
        <Outlet />
        </>
    )
}

export default NavBar