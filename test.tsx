async function deleteImg() {
    const url = `http://10.11.11.3:3333/user/delete/pp`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        })
        window.location.reload();
    } catch (error) {
        console.log("error", error);
    }
 
}