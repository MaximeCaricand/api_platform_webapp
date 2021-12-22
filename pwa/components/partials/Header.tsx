import { useRouter } from "next/dist/client/router";
import Link from "next/link";

export default function Header(props) {

    function renderActiveNavLink(href: string, label: string): JSX.Element {
        let elementClass = "nav-link";
        if (router.pathname === href) {
            elementClass += " active";
        }
        return (
            <li className="nav-item">
                <Link href={href}>
                    <a className={elementClass} dangerouslySetInnerHTML={{ __html: label }}></a>
                </Link>
            </li>
        );
    }

    const router = useRouter();
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand ms-5" href="/">Accueil</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {renderActiveNavLink("/average-surface-cost", `Prix moyen du m${"2".sup()}`)}
                        {renderActiveNavLink("/number-of-sales", "Nombre de ventes")}
                        {renderActiveNavLink("/sales-per-area", "Ventes par région")}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

function ActiveNavLink() {
    return
}