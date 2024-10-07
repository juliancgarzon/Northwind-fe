window.onload = (event) => {
    const encodeData = window.location.hash.substring(1);
    const data = JSON.parse(atob(encodeData));
    console.log(data);
};