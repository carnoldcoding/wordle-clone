export const getWord = async function(){
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    if(!response.ok){
        console.log(`Error, couldn't fetch random word, Code: ${response.status}`)
    }else{
        const data = await response.json();
        return data[0];
    }
}