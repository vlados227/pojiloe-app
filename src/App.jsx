import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ExcursionList from './components/Excursions/ExcursionList';
// import ExcursionDetails from './components/Excursions/ExcursionDetails';
import AddExcursion from './components/Excursions/AddExcursion';
import ManageExcursions from './components/Admin/ManageExcursions';
import UpdateExcursion from './components/Admin/UpdateExcursion';

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/excursions/all" exact Component={ExcursionList} />
          {/* <Route path="/excursions/:id" Component={ExcursionDetails} /> */}
          <Route path="/admin/add-excursion" Component={AddExcursion} />
          <Route path="/admin/manage-excursions" Component={ManageExcursions} />
          <Route path="/admin/update-excursion/:id" Component={UpdateExcursion} />
          <Route path="/" exact component={ExcursionList} />
        </Routes>
      </Router>
    );
};

export default App;