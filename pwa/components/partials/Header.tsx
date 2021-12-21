import Link from "next/link";

export default function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Accueil</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/average-surface-cost">
                                <a className="nav-link">Prix moyen du m<sup>2</sup></a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/number-of-sales">
                                <a className="nav-link">Nombre de ventes</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/sales-per-area">
                                <a className="nav-link">Ventes par région</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}