const cards = document.querySelectorAll(".card")
let currentCards = []

cards.forEach(card => card.addEventListener("click", flipCard))
let lockBoard = false


function congratulations(){
   let flipped = document.getElementsByClassName("flipCard")
   if(flipped.length === 18){
      setTimeout(() => {
         alert("Parabéns!");
      }, 500)
   } 
}

function flipCard(){ 
   if(lockBoard === true) return
   this.classList.add("flipCard") 
   currentCards.push(this.id)
   if(currentCards[0] === currentCards[1]){
      currentCards.splice(0, 1)
   } 
   if(currentCards.length === 2 && document.getElementById(currentCards[1]).className === "card flipCard done"){
      currentCards.splice(1, 1)
   }
   if(document.getElementById(currentCards[0]).className === "card flipCard done"){
      currentCards.splice(0, 1)
   }
   if(currentCards.length === 2){
      if(document.getElementById(currentCards[0]).children[1].src !== document.getElementById(currentCards[1]).children[1].src){
         lockBoard = true
         setTimeout(() => {
            document.getElementById(currentCards[0]).classList.remove("flipCard")
            document.getElementById(currentCards[1]).classList.remove("flipCard")
            currentCards = []
            lockBoard = false
         }, 500)
      } else {
         document.getElementById(currentCards[0]).classList.add("done")
         document.getElementById(currentCards[1]).classList.add("done")
         currentCards = []
         congratulations() 
      }
   }
}

function shuffle(array) {
   let currentIndex = array.length,  randomIndex;
 
   while (currentIndex != 0) {

     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex--;
 
     [array[currentIndex], array[randomIndex]] = [
       array[randomIndex], array[currentIndex]];
   }

   return array;
 }

function setSource(){
   const numberArray = ["1.jfif", "2.jpg", "3.jpg", "4.jfif", "5.jfif", "6.jfif", "7.jfif", "8.jpg", "9.jfif"];
   const cardsIds = ["card0", "card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10", "card11", "card12", "card13", "card14", "card15", "card16", "card17"]
   shuffle(cardsIds)
   for (let index=0; index <= 8; index += 1){
      document.getElementById(cardsIds[index]).setAttribute("src", numberArray[index]);
      document.getElementById(cardsIds[index + 9]).setAttribute("src", numberArray[index]);
   }
}

function restart(){
   cards.forEach(card => card.classList.remove("flipCard"))
   setTimeout(() => {
      setSource()
   }, 500)
}
