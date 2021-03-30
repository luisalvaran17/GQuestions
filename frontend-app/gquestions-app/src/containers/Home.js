import React, { Component } from 'react';
import NavAndBody from '../components/home/NavAndBody';
import Footer from "../components/home/Footer";
import "../assets/styles/tailwind.css";

class Index extends Component {
    render() {
        return (
            <div className="font-manrope">
                
                <NavAndBody /> {/* parking component jsx */}

                <Footer /> {/* Footer component jsx */}

            </div>
        );
    }
}

export default Index;