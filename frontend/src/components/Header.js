import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Know the ropes</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            {userInfo ? (
              <Nav className='ml-auto'>
                <NavDropdown title={userInfo.name} id='username'>
                  <>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>My Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/personlist'>
                      <NavDropdown.Item>Persons</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/research'>
                      <NavDropdown.Item>Research</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/about'>
                      <NavDropdown.Item>About</NavDropdown.Item>
                    </LinkContainer>
                  </>
                  {userInfo && userInfo.isAdmin && (
                    <LinkContainer to='/admin/userList'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className='ml-auto'>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
