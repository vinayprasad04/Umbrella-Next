import React, { useState } from 'react';
import { allFontAwesomeIcons } from "../icons/allIcons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AllIconsPage = () => {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(40);

    const handleCopy = async (prefix: string, name: string) => {
        const jsxSnippet = `<FontAwesomeIcon icon={['${prefix}', '${name.replace('fa', '').toLowerCase()}']} />`;
        try {
            await navigator.clipboard.writeText(jsxSnippet);
            setCopied(name);
            window.alert(`Copied JSX to clipboard!\n${jsxSnippet}`);
            setTimeout(() => setCopied(null), 1000);
        } catch {
            window.alert("Failed to copy icon.");
        }
    };

    const filteredIcons = allFontAwesomeIcons.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (page - 1) * itemsPerPage;
    const paginatedIcons = filteredIcons.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);

    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>All FontAwesome Icons</h1>
            <div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <input
                    placeholder="Search icons..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 200 }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label htmlFor="page-size" style={{ fontSize: 14 }}>Items per page:</label>
                    <select
                        id="page-size"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                        style={{ border: '1px solid #ccc', borderRadius: 4, padding: '4px 8px', fontSize: 14 }}
                    >
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                    </select>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 16
            }}>
                {paginatedIcons.map(({ icon, name, prefix }, idx) => (
                    <div key={idx} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                        <FontAwesomeIcon icon={icon} size="2x" />
                        <span style={{ fontSize: 12, marginTop: 8, textAlign: 'center', wordBreak: 'break-all' }}>{name}</span>
                        <span style={{ fontSize: 10, color: '#888' }}>{prefix}</span>
                        <button
                            onClick={() => handleCopy(prefix, name)}
                            style={{ marginTop: 8, fontSize: 12, padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc', background: copied === name ? '#FF6B2C' : '#fff', color: copied === name ? '#fff' : '#333', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            {copied === name ? 'Copied!' : 'Copy JSX'}
                        </button>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            style={{
                                padding: '6px 12px',
                                borderRadius: 4,
                                border: '1px solid #ccc',
                                background: page === i + 1 ? '#FF6B2C' : '#fff',
                                color: page === i + 1 ? '#fff' : '#333',
                                fontWeight: 500,
                                cursor: 'pointer',
                                margin: 2
                            }}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllIconsPage; 