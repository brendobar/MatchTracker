import styles from './Layout.module.scss'
import {Outlet} from "react-router-dom";
import {Suspense} from "react";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <main className={styles.main}>
                <Suspense fallback={<p>Loading...</p>}>
                    <Outlet/>
                </Suspense>
            </main>
        </div>
    );
};

export default Layout;