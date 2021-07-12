import React, { useEffect, useReducer, useRef } from 'react';
import Link from 'next/link';

const CategoriesList = ({ slides }) => {

    const [state, dispatch] = useReducer(slidesReducer, initialState);

    return (
        <div className="slides">
            {[...slides, ...slides, ...slides].map((slide, i) => {
                let offset = slides.length + (state.slideIndex - i);
                return <Slide slide={slide} offset={offset} key={i} />;
            })}
            <div className="gbutton">
                <button onClick={() => dispatch({ type: "NEXT", payload: slides })}>‹</button>
                <button onClick={() => dispatch({ type: "PREV", payload: slides })}>›</button>
            </div>
        </div>
    );
}

function useTilt(active) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current || !active) {
            return;
        }

        const state = {
            rect: undefined,
            mouseX: undefined,
            mouseY: undefined
        };

        let el = ref.current;

        const handleMouseMove = (e) => {
            if (!el) {
                return;
            }
            if (!state.rect) {
                state.rect = el.getBoundingClientRect();
            }
            state.mouseX = e.clientX;
            state.mouseY = e.clientY;
            const px = (state.mouseX - state.rect.left) / state.rect.width;
            const py = (state.mouseY - state.rect.top) / state.rect.height;

            el.style.setProperty("--px", px);
            el.style.setProperty("--py", py);
        };

        el.addEventListener("mousemove", handleMouseMove);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
        };
    }, [active]);

    return ref;
}

const initialState = {
    slideIndex: 0
};

const slidesReducer = (state, event) => {
    if (event.type === "NEXT") {
        console.log(event.payload.slides);
        return {
            ...state,
            slideIndex: (state.slideIndex + 1) % event.payload.length
        };
    }
    if (event.type === "PREV") {
        console.log(event.payload.slides);
        return {
            ...state,
            slideIndex:
                state.slideIndex === 0 ? event.payload.length - 1 : state.slideIndex - 1
        };
    }
};

function Slide({ slide, offset }) {
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);

    return (
        <div
            ref={ref}
            className="slide"
            data-active={active}
            style={{
                "--offset": offset,
                "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
            }}
        >
            <Link href={`/products/${slide.url}`} key={slide.id}>
                <a>
                    <div
                        className="slideContent"
                        style={{
                            backgroundImage: `url('${slide.imagen.url}')`
                        }}
                    >
                        <div className="slideContentInner">
                            <h2 className="slideTitle">{slide.title}</h2>
                            <p className="slideDescription">{slide.descripcion}</p>
                        </div>
                    </div>
                </a>
            </Link>

        </div>
    );
}

export default CategoriesList;
