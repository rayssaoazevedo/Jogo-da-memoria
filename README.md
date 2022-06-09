# Jogo-da-memoria

## Sobre o projeto

Projeto feito para a aula de Construção de Software para Web, no segundo período do curso de Ciência da Computação.
O projeto consiste de um jogo da memória, onde se deve encontrar a dupla de todas as figuras dos filhotinhos para ganhar o jogo.

## Acesso ao projeto
Para jogar, entre no link a baixo:
https://rayssaoazevedo.github.io/Jogo-da-memoria/

### Status do projeto: Concluído

## Linguagens

- HTML
- CSS
- JAVASCRIPT

## Código 

O jogo funciona como um jogo da memória tradicional. Ele é composto por 18 cartas, que possuem frente e verso.

![image](https://user-images.githubusercontent.com/95149345/172736817-8bacead0-9b78-48c8-ab8b-814aef232741.png)

Ao carregar a página a função setSource() utiliza o algoritmo Fisher-Yates (http://sedition.com/perl/javascript-fy.html) para embaralhar a posição dos elementos do array das cartas, fazendo com que cada imagem seja definida como a fonte de duas cartas aleatórias.

```
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

```

```
function setSource(){
   const numberArray = ["1.jfif", "2.jpg", "3.jpg", "4.jfif", "5.jfif", "6.jfif", "7.jfif", "8.jpg", "9.jfif"];
   const cardsIds = ["card0", "card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10", "card11", "card12", "card13", "card14", "card15", "card16", "card17"]
   shuffle(cardsIds)
   for (let index=0; index <= 8; index += 1){
      document.getElementById(cardsIds[index]).setAttribute("src", numberArray[index]);
      document.getElementById(cardsIds[index + 9]).setAttribute("src", numberArray[index]);
   }
}

```
Ao clicar em uma carta, esta vira e permance virada até que outra carta seja clicada. 
Após escolher duas cartas, o código verifica se elas possuem a mesma imagem. Caso seja, a função "tranca" elas viradas, 
se não a função faz elas virarem automáticamente.


![Jogo-da-Memória-Opera-2022-06-08-21-20-56_Trim](https://user-images.githubusercontent.com/95149345/172739345-d6850edd-9427-4707-9f36-82f535fd4373.gif)


```
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
```
Após completar todas as duplas, uma mensagem de alerta irá aparecer dando os parabéns. Isso acontece pois a função congratulation() checa a quantidade de cartas viradas toda vez que uma dupla é virada com sucesso. Essa função ativa o alerta de parabéns quando o length de cartas viradas chega a 18.


![Parabéns](https://user-images.githubusercontent.com/95149345/172740290-c821da37-277a-46f7-9d8b-6de5a9b1f59b.gif)


```
function congratulations(){
   let flipped = document.getElementsByClassName("flipCard")
   if(flipped.length === 18){
      setTimeout(() => {
         alert("Parabéns!");
      }, 500)
   } 
}
```

Ao final do jogo, ou durante o jogo se prefirir, o jogador tem a opção de apertar o botão de "rastart" que vai virar todas as cartas e embaralha-las novamente.


![Restart](https://user-images.githubusercontent.com/95149345/172740824-f0488704-4d81-4a3a-a400-37a7b80e7741.gif)


```
function restart(){
   cards.forEach(card => card.classList.remove("flipCard"))
   setTimeout(() => {
      setSource()
   }, 500)
}
```
