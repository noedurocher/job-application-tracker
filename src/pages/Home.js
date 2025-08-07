import {Link} from 'react-router-dom';
import '../css/Home.css';

function Home(){
    return(
        <div>
            <header className="navigation">
                <p><Link to="/login">Login</Link></p>
            </header>
            <main >
                <img src="/images/background.jpg" alt="background" className="background"/>
            </main>
            <footer className="footer">
                <p>&copy; Job Tracker 2025</p>
            </footer>
        </div>
    )
}

export default Home;

