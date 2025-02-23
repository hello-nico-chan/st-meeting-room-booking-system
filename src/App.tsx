import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MeetingRooms from './components/MeetingRooms';
import BookingRecords from './components/BookingRecords';
import Users from './components/Users';
import SignIn from './components/SignIn';
import { useSelector } from 'react-redux';
import { RootState } from './store/index'

function App() {
  const userAccessToken = useSelector((state: RootState) => state.userAccessToken);

  return (
    <BrowserRouter>
      <Header />

      <div>
        {userAccessToken === "" ? (
          <SignIn />
        ) : (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/MeetingRooms" element={<MeetingRooms />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/BookingRecords" element={<BookingRecords />} />
          </Routes>
        )}
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
