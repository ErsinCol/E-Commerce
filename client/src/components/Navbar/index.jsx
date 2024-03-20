import {Link, NavLink} from "react-router-dom";
import styles from "./styles.module.css";
import {Button} from "@chakra-ui/react";
import {useAuth} from "../../contexts/AuthContext.jsx";

export default function Navbar() {
    const {isLoggedIn} = useAuth();

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to="/">eCommerce</Link>
                </div>
                <ul className={styles.menu}>
                    <li>
                        <NavLink to="/">Products</NavLink>
                    </li>
                </ul>
            </div>
            <div className={styles.right}>
                {!isLoggedIn ? (
                    <>
                        <Link to="/signin">
                            <Button colorScheme="pink">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button colorScheme="pink">Register</Button>
                        </Link>
                    </>
                ) : (
                    <Link to="/profile">
                        <Button colorScheme="pink">Profile</Button>
                    </Link>
                )
                }
            </div>
        </nav>
    );
}