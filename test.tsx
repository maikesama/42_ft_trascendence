async function deleteImg() {
    const url = `http://localhost:3333/user/delete/pp`;
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