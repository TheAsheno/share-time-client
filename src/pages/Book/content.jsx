import React, { useEffect } from "react";
import FragmentsFx from "./main.js";
import { BASE_URL } from "../../config/constants";

const Content = ({ index, BookData, isTranslate }) => {
    useEffect(() => {
        new FragmentsFx(document.getElementById('frag-3'), {
            fragments: 20,
            boundaries: { x1: 100, x2: 300, y1: 0, y2: 0 },
            randomIntervals: {
                top: { min: 0, max: 90 },
                left: { min: 0, max: 90 },
                dimension: {
                    width: { min: 50, max: 100, fixedHeight: 0.5 },
                    height: { min: 50, max: 100, fixedWidth: 0.5 }
                }
            }
        });
    }, []);
    return (
        <section>
            <div className="book-content" style={{ animation: 'fadeIn 2s' }}>
                <div id="frag-3" className="fragment-wrap fragment-wrap--right" style={{ backgroundImage: `url(${BASE_URL}/book/images/${encodeURIComponent(BookData[index].image)})` }}></div>
                <div className="book-info book-info-left">
                    <h2 className="book-title book-title--left">{isTranslate ? BookData[index].name2 : BookData[index].name}</h2>
                    <h3 className="book-author book-author-left">{isTranslate ? BookData[index].author2 : BookData[index].author}</h3>
                    <pre className="book-text book-text--left">{isTranslate ? BookData[index].text2 : BookData[index].text}</pre>
                </div>
            </div>
        </section>
    );
}

export default Content;