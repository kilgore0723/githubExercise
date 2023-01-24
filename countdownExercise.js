function countDown(num){
    let counter = setInterval(function() {
        num--;
        if(num > 0){
            console.log(num)
        }
        else {
            clearInterval(counter);
            console.log("DONE!");
        }
    }, 1000)
}
countDown(10);