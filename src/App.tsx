import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MeetingRooms from './components/MeetingRooms';
import BookingRecords from './components/BookingRecords';
import Users from './components/Users';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/MeetingRooms" element={<MeetingRooms />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/BookingRecords" element={<BookingRecords />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
