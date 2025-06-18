// icon-catalog-frontend/src/components/HomePage.jsx (Без змін від попередньої версії)
import React, { useState } from 'react';
import axios from 'axios';
import AkathistCard from './AkathistCard';
import IconCard from './IconCard';

const API_URL_SEARCH = 'http://localhost:5000/api/search';

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ icons: [], akathists: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults({ icons: [], akathists: [] });
            setHasSearched(true);
            return;
        }

        setLoading(true);
        setError(null);
        setHasSearched(true);
        try {
            const response = await axios.get(`${API_URL_SEARCH}?query=${encodeURIComponent(searchQuery)}`);
            console.log("Відповідь від API пошуку:", response.data);
            setSearchResults(response.data);
        } catch (err) {
            console.error('Помилка пошуку:', err);
            setError('Не вдалося виконати пошук. Спробуйте пізніше.');
            setSearchResults({ icons: [], akathists: [] });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="homepage-container">
            <div className="homepage-overlay">
                <div className="homepage-content">
                    <h1>Ласкаво просимо до Каталогу Ікон та Акафістів</h1>
                    <p>Знайдіть потрібну ікону або акафіст за назвою, номером, місцем зберігання чи описом.</p>

                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Пошук..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <i className="fas fa-search"></i>
                            Пошук
                        </button>
                    </form>

                    {loading && <p className="loading-message">Шукаємо...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {hasSearched && !loading && !error && (
                        <div className="search-results">
                            {searchResults.icons.length === 0 && searchResults.akathists.length === 0 ? (
                                <p className="no-results">Нічого не знайдено за вашим запитом.</p>
                            ) : (
                                <>
                                    {searchResults.icons.length > 0 && (
                                        <>
                                            <h3>Знайдені Ікони:</h3>
                                            <div className="icon-list search-results-grid">
                                                {searchResults.icons.map(icon => (
                                                    <IconCard key={icon._id} icon={icon} isAdmin={false} />
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {searchResults.akathists.length > 0 && (
                                        <>
                                            <h3>Знайдені Акафісти:</h3>
                                            <div className="akathist-list search-results-grid">
                                                {searchResults.akathists.map(akathist => (
                                                    <AkathistCard key={akathist._id} akathist={akathist} isAdmin={false} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;