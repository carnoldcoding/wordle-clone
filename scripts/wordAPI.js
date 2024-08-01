export const getWord = async function(length){
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}`);
    if(!response.ok){
        console.log(`Error, couldn't fetch random word, Code: ${response.status}`)
    }else{
        const data = await response.json();
        console.log(data[0]);
        return data[0];
    }
}