import React, {Component} from "react";
import "../../assets/styles/tailwind.css";

class Header extends Component {

    constructor(props) {
        super(props)
        this.divRefMenu = React.createRef()
    }

    state = {
    };

    addRemoveClassMenu = () => {
        let classList = this.divRefMenu.current.classList
        let statusMenu = false;
        for (let i=0; i<classList.length; i++){
            console.log(classList[i])
            if(classList[i] === 'hidden'){
                statusMenu = true;
                this.divRefMenu.current.classList.remove('hidden')
                break;
            }
            else {
                statusMenu = false;
            }
        }
        if (statusMenu === true){
            this.divRefMenu.current.classList.remove('hidden')
        }
        else if (statusMenu === false){
            this.divRefMenu.current.classList.add('hidden')
        }
        return true
    }

    render(){
        return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0  mr-6">
                <svg  className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
            </div>
            <div className="block lg:hidden">
                <button onClick={this.addRemoveClassMenu} id='boton' className="flex items-center px-3 py-2 border rounded text-teal-200 border-yellow-400 hover:text-yellow-600 hover:border-yellow-600">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div ref={this.divRefMenu} 
                id='menu'
                className="hidden w-full block gap-x-6 flex-grow lg:flex lg:items-center lg:w-auto ">
                <div className="text-sm lg:flex-grow">
                    <a className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-yellow-600">
                        Docs
                    </a>
                    <a className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-yellow-600">
                        Examples
                    </a>
                    <a className="block mt-4 lg:inline-block lg:mt-0 hover:text-yellow-600">
                        Blog
                    </a>
                </div>
                <div>
                    <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent hover:text-teal-500 hover:bg-yellow-600 mt-4 lg:mt-0">Download</a>
                </div>
                <div>
                    <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent hover:text-teal-500 hover:bg-yellow-600 mt-4 lg:mt-0">Download</a>
                </div>
            </div>
        </nav>
        );
    }
}

export default Header;