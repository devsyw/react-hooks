import defaultAxios from "axios";
import { useEffect, useState } from "react";

const useAxios = (opts, axiosInstance = defaultAxios) => {
    const [state, setState] = useState({
        Loading : true,
        Error : null,
        data : null
    });
    const [trigger, setTrigger] = useState(0);
    if(!opts.url) {
        return;
    }
    const refetch = () => {
        setState({
            ...state,
            Loading : true
        });
        setTrigger(Date.now());
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosInstance(opts).then(data => {
            setState({
                ...state,
                Loading : false,
                data
            });
        }).catch(error => {
            setState({
                ...state,
                Loading : false,
                error
            });
        });
    }, [trigger]);
    return {...state, refetch};
} 

export default useAxios;