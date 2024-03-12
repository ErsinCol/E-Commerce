import {Link, NavLink} from "react-router-dom";
import styles from "./styles.module.css";
import {Button} from "@chakra-ui/react";

export default function Navbar(){
    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className="logo">
                    <Link to="/">eCommerce</Link>
                </div>
                <ul className={styles.menu}>
                    <li>
                        <NavLink to="/">Products</NavLink>
                    </li>
                </ul>
            </div>
            <div className={styles.right}>
                <Link to="/signin">
                    <Button colorScheme="pink">Login</Button>
                </Link>
                <Link to="/register">
                    <Button colorScheme="pink">Register</Button>
                </Link>
            </div>
        </nav>
    );
}