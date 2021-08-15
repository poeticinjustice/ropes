import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import PersonListScreen from './screens/PersonListScreen'
import PersonScreen from './screens/PersonScreen'
import ResearchListScreen from './screens/ResearchListScreen'
import ResearchScreen from './screens/ResearchScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import PersonEditScreen from './screens/PersonEditScreen'
import ResearchEditScreen from './screens/ResearchEditScreen'
import AboutScreen from './screens/AboutScreen'
import TestScreen from './screens/TestScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/about' component={AboutScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/person/:id' component={PersonScreen} exact />
          <Route path='/research/:id' component={ResearchScreen} exact />
          <Route path='/research' component={ResearchListScreen} exact />
          <Route path='/admin/userList' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />{' '}
          <Route path='/personlist' component={PersonListScreen} exact />
          <Route
            path='/personlist/:pageNumber'
            component={PersonListScreen}
            exact
          />
          <Route path='/person/:id/edit' component={PersonEditScreen} />{' '}
          <Route path='/research/:id/edit' component={ResearchEditScreen} />{' '}
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/test/:id' component={TestScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
