
    function postData (url, data) {
        const response = axios.post(url, {
            data: data
        });

        return response;
    }

    function getData (url) {
        const res = axios.get(url);
        return res;
    }

    function setZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


export {postData, getData, setZero};