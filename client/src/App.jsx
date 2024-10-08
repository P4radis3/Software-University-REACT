import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import UserProfile from "./components/profile/User Profile";

import AllBooks from "./components/books-main/all-books/All Books";
import BookDetails from "./components/books-main/book-details/Book Details";
import AddBook from "./components/books-main/add-book/Add Book";
import EditBook from "./components/books-main/edit-book/Edit Book";

import NotFound from "./components/not-found/Not Found";

import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Logout from "./components/auth/logout/Logout";

import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              
                <Route path="/my-profile" element={<UserProfile />} />
              
                <Route path="/all-books" element={<AllBooks />} />
                <Route path="/all-books/:bookId" element={<BookDetails />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/all-books/:bookId/edit-book" element={<EditBook />} />

                <Route path="*" element={<NotFound />} />
              
                <Route path="/logout" element={<Logout />} />
            </Routes>

        </AuthProvider>
    );
};

export default App