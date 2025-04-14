import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './components/Common/Landing';
import AdLogin from './components/Admin/AdLogin';
import AdDashboard from './components/Admin/AdDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddNewBooks from './components/Admin/AddNewBooks';
import BookList from './components/Admin/BookList';
import { BookListPageEdit } from './components/Pages/BookListPageEdit';
import BorrowHistory from './components/Admin/BorrowHistory';
import ReturnHistory from './components/Admin/ReturnHistory';
import UserLogin from './components/User/UserLogin';
import Register from './components/User/Register';
import UserDashboard from './components/User/UserDashboard';
import UserBookList from './components/User/UserBookList';
import UserBookListReg from './components/User/UserBookListReg';
import UserReturnBook from './components/User/UserReturnBook';


const routes = [
  { path: '/', element: <Landing/> },
  { path: '/adloginpage', element: <AdLogin/> },
  { path: '/addashboard', element: <AdDashboard/> },
  { path: '/add-new-book', element: <AddNewBooks/> },
  { path: '/book-list', element: <BookList/> },
  { path: '/edit-book', element: <BookListPageEdit/> },
  { path: '/borrow-history', element: <BorrowHistory/> },
  { path: '/return-history', element: <ReturnHistory/> },
  // ------------------------
  { path: '/userlogin', element: <UserLogin/> },
  { path: '/user-register', element: <Register/> },
  { path: '/user-dashboard', element: <UserDashboard/> },
  { path: '/userbooklist', element: <UserBookList/> },
  { path: '/userbooklistreg', element: <UserBookListReg/> },
  { path: '/return-book', element: <UserReturnBook/> },
];
function App() {  
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;