'use client'
import './page.css'
import React from 'react';

const App: React.FC = () => {
    return (
        <main>
            <div id="display">
                <br />
                <section id="firstText">Hello, how are you?</section>
            </div>
            <div id="type-box">
                <input type="text" placeholder="Message" id="text" />
                <a>
                    <button id="send">
                        <svg viewBox="0 0 512 512" width={20} title="location-arrow">
                            <path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z" />
                        </svg>
                    </button>
                </a>
            </div>
        </main>

    );
};

export default App;
