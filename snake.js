// alert("! ALERT !")
// alert("You have 5 whatsapp from 3 different chats")
// alert("Isaac: Hi")
// alert("Isaac: HELLO")
// alert("Bob: Hi")
// alert("Arthur: Are u free")
// alert("Arthur: ?")
$(document).ready(function(){
    var canvas = document.getElementById('Box');
    var context = canvas.getContext("2d");
    //SET GRID
    var gridNum = 52;
    var gridSize=canvas.width/gridNum;

    //Setting up player and food objects
    var food = {
      x:0,
      y:0,
      alive:false
    }

    var player ={
      x:7,
      y:7,
      //C0de moving-5, Right-0, Left-1, Up-2, Down-3
      direction:5,
      alive:true,
      //length of snake
      tail:1
    }

    //Storage/SSD

    var snakeBody=[[7,7]];
    //Setting
    var keyPressed = null;
    var leftKey=37;
    var upKey=38;
    var rightKey=39;
    var downKey=40;

    //msake a custom .insert()

    Array.prototype.insert=function(index, item){
      // .splice
      this.splice(index,0,item);
    }
      //define
    function update(){
    //Change direction via input
      if(keyPressed){
        if(keyPressed==rightKey &&player.direction!=1){
          player.direction=0;
        }
        if(keyPressed==leftKey &&player.direction!=0){
          player.direction=1;
        }
        if(keyPressed==upKey &&player.direction!=3){
          player.direction=2;
        }
        if(keyPressed==downKey &&player.direction!=2){
          player.direction=3;
        }

      }

      //2.
      if(!food.alive){
        //genetate random number from 0 to 19 (for 20x20 grid system)
        food.x= Math.floor(Math.random()*20)
        food.y= Math.floor(Math.random()*20)

        var collided;

        do {
          collieded = false;
          for(var i = 0; i < player.tail; i++){
            if(food.x == snakeBody[i][0] && food.y ==[i][0])
            collided = true;
            food.x = Math.floor(Math.random() * gridNum)
            food.y = Math.floor(Math.random() * gridNum)
            break;
          }
        }while(collided)
      //Now have food back
        food.alive = true;
      }
      //Check if Player has food
      if(player.x == food.x && player == food.y){
          food.alive = false;
          player.tail++;
      }
      //Check if player eats it self
      if(player.tail >1){
        for(var i = 1; i < player.tail; i++)
        if(player.x == snakeBody[i][0] && player.y == snakeBody[i][1]){
          player.alive = false;
          clearInterval(updates);
        }
      }
      //Check if Player Hit border
      if(player.x >= gridNum || player.x < 0 || player.y >= gridNum || player.y < 0){
        player.alive = false;
        clearInterval(updates)
      }

      snakeBody.insert(0, [player.x, player.y]);
      while(snakeBody.length > player.tail + 1){
        snakeBody.pop();
      }

      switch(player.direction){
        // Right
        case 0:
        player.x +=1; break;
        // Left
        case 1:
        player.x -=1; break;
        // Up
        case 2:
        player.y -=1; break;
        // Down
        case 3:
        player.y +=1; break;
      }
      // CALL DRAW
      if(player.alive){
        draw();
      }

    }

    // 6. draw function
    function draw(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      //draw
      context.fillStyle = "red";
      context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
      //draw
      for(var i = 0; i < player.tail; i++){
        context.fillStyle = "black";
        context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize)
      }
    }

    // 7. keydown event
    $(window).on("keydown" ,function(event) {
      keyPressed = event.which;
    })


    update();
    var updates = setInterval(update, 100);
  });
