import { Outlet } from 'react-router-dom';
import Feed from '../components/Feed/Feed';
// import Feed from '../pages/Feed/Feed';

// import NavBar from '../Pages/shared/NavBar';
// import Footer from '../Pages/shared/Footer';

const Main = () => {
    return (
        <div>
            {/* <div>
                <NavBar></NavBar>
            </div>
            <div className='container mx-auto'>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div> */}
            {/* <h1>MainLayout</h1> */}

            {/* <Feed></Feed> */}
            <Feed></Feed>
        </div>
    );
};

export default Main;