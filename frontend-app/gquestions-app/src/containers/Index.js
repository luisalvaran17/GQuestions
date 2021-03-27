import React, { Component } from 'react';
import Header from '../components/home/Header';
import Body from '../components/home/Body';
import Footer from "../components/home/Footer";
import "../assets/styles/tailwind.css";

class Index extends Component {
    render() {
        return (
            <div className="container mx-auto">

                <Header /> {/* Header component jsx */}

                <Body /> {/* parking component jsx */}

                <Footer /> {/* Footer component jsx */}

            </div>
        );
    }
}

export default Index;