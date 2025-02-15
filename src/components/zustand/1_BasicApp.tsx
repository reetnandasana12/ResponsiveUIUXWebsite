import { useEffect } from "react";
import { useCounterStore } from "./store";

const setCount = () => {
    useCounterStore.setState({ count: 1 });
};

function ZuStand() {
    const count = useCounterStore((state) => state.count);
    return (
        <div>
            <OtherComponent count={count} />
        </div>
    )
}
const OtherComponent = ({ count }: { count: number }) => {
    const incrementAsync = useCounterStore((state) => state.incrementAsync);
    const decrement = useCounterStore((state) => state.decrement);

    useEffect(() => {
        setCount();
    }, []);

    return (
        <div>
            {count}
            <div>
                <button onClick={incrementAsync}>IncrementAsync</button>
                <button onClick={decrement}>Decrement</button>
            </div>
        </div>
    );
};

export default ZuStand
