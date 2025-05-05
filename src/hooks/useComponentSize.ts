import React from 'react';

export default function useComponentSize() {
    const [size, setSize] = React.useState({width: 0, height: 0});
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            const updateSize = () => {
                if (ref.current) {
                    setSize({
                        width: ref.current.clientWidth,
                        height: ref.current.clientHeight,
                    });
                }
            };
            updateSize();
            window.addEventListener('resize', updateSize);
            return () => {
                window.removeEventListener('resize', updateSize);
            };
        }
    }, []);

    return {ref, size};
}