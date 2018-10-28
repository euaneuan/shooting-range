var xpos_can; //this is the Xpos of the ca
var ypos_can; //this is the Ypos of the cans
var xpos_targets; // these are the Xpos 0f the cans
var ypos_targets; // these are the Ypos of the cans
var cans = []; //this creates an empty array to be filled by the index
var targets = []; //this creates an empty array to be filled by the index 
var xpos_of_ellipses = [380, 100] //this is the xpos of ellipses
var ypos_of_ellipses = [120, 370] //this is the Ypos of ellipses
var ellipses = []; //this creates an empty array to be filled by the index
var xpos_of_stop = [170, 30] //this is where the moving target should stop
var face_where = ['right', 'left']; //this states the direction the moving ellipses are going
var point; //
var table;//pp
var newtable;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable('this_is_France.csv', 'csv', 'header');
  newtable = loadTable('this_is_britain.csv', 'csv', 'header');
  //the file can be remotep
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
}

function setup() {
    createCanvas(1600, 1700); // creates canvas
    
  xpos_can = table.getColumn('x pos of can')
  ypos_can = table.getColumn('y pos of can')
  xpos_targets = newtable.getColumn('x pos of can')
  ypos_targets = newtable.getColumn('y pos of can')
    

  //cycle through the table
    for (var i = 0; i < xpos_can.length; i++) {
        cans[i] = new Can(xpos_can[i], ypos_can[i]);
    }
    //the array directly above does the same thing as the last one but gives the coordinates to the targets
    for (var o = 0; o < xpos_of_ellipses.length; o++) {
        ellipses[o] = new Ellipses(xpos_of_ellipses[o], ypos_of_ellipses[o], xpos_of_stop[o], face_where[o]);
    }
    
    //this new array is the moving target and its  movement
    point = 0;
}

function draw() {
    background(220);
    cursor(CROSS)

    for (var i = 0; i < cans.length; i++) {
        cans[i].display();
    }
    for (var j = 0; j < targets.length; j++) {
        targets[j].display();
    }
    for (var o = 0; o < ellipses.length; o++) {
        ellipses[o].moveLeft();
        ellipses[o].spoint_qm();
        ellipses[o].answer();
        ellipses[o].display();
    }
    //all the arrays made above allow the cans, targets & the moving targets visible by using .display
    textSize(20)
    text(millis() / 1000, 50, 50);
    stroke(0)
    strokeWeight(1)
    fill(200, 100, 30)
    rect(0, 350, 300, 20)
    rect(0, 130, 180, 20)
    rect(230, 230, 170, 20)
    rect(177,157,220,20)//ppppp
    rect(0,450,400,20)
    rect(390,360,400,20)
    fill(255)
    noFill()
    strokeWeight
    ellipse(mouseX, mouseY, 20, 20)
    //this make the timer and the wooden stands where all the pepsi cans are sitting on and also the circle around the cursor
    textSize(30)
    text('point:' + point,500,60)//
}

function mouseClicked() {
    for (var i = 0; i < cans.length; i++) {
        cans[i].gotHit(mouseX, mouseY, i);
    }
    for (var j = 0; j< targets.length; j++) {
        targets[j].gotHit(mouseX, mouseY, j);
    }//ppp
}


function Can(x, y) {
    this.x = x;
    this.y = y;

    //hitbox tl => top left / br=> bottom right
    this.hitbox_l_x = this.x;
    this.hitbox_t_y = this.y;
    this.hitbox_r_x = this.x + 20;
    this.hitbox_b_y = this.y + 30;


    this.display = function () {
        strokeWeight(1)
        stroke(0)
        fill(0, 120, 255)
        rect(0 + this.x, 0 + this.y, 20, 30)
        fill(255, 0, 0)//pppp
        ellipse(10 + this.x, 16 + this.y, 15, 15)
        fill(255)
        textSize(6)
        text('PEPSI', 2 + this.x, 29 + this.y) //the word pepsi
        //the white line
        stroke(255)
        strokeWeight(2)
        line(16 + this.x, 13 + this.y, 6 + this.x, 21 + this.y)
        stroke(0, 120, 155)
        strokeWeight(3)
        line(19 + this.x, 13 + this.y, 8 + this.x, 21 + this.y) //the blue line
    }//p
    for (var j = 0; j < ellipses.length; j++) {
        //2
        ellipses[j].display();
        ellipses[j].checkPoint();
    }//p
    this.gotHit = function (mX, mY, can_num) {
        //todo
        if (mX >= this.hitbox_l_x && mX <= this.hitbox_r_x && mY >= this.hitbox_t_y && mY <= this.hitbox_b_y) {
            cans.splice(can_num, 1);
            point += 1;

        }//p
//    this.gotHit = function (mX, mY, target_num) {
//        //todop
//        if (mX >= this.hitbox_l_x && mX <= this.hitbox_r_x && mY >= this.hitbox_t_y && mY <= this.hitbox_b_y) {
//            targets.splice(targets_num, 1);
//            point += 1;
//
//        }
        //if mouseX is inside tlx and brx and tly bry
        //   count .2 sec / disappear /add point
        // count 3 sec / appear
    }
    // THIS ENTIRE FUNCTION IS FOR THE DESIGN OF THE CANS AND THE PROTOTYPE HITBOX AND APPLIES THE X AND Y POSITION TO THE CANS
}

function Target(x, y) {
    this.x = x
    this.y = y
    //pppp
    this.hitbox_l_x = this.x;//
    this.hitbox_t_y = this.y;
    this.hitbox_r_x = this.x + 40;
    this.hitbox_b_y = this.y + 40;
    this.display = function () {
        strokeWeight(2)
        stroke(0)
        fill(255)
        rect(0 + this.x, 0 + this.y, 40, 40)
        ellipse(20 + this.x, 20 + this.y, 35, 35)
        ellipse(20 + this.x, 20 + this.y, 20, 20)
        ellipse(20 + this.x, 20 + this.y, 7, 7)
    }
        for (var i = 0; i < targets.length; i++) {
        //2pp
        targets[i].display();
    }//ppppopppppp
    this.gotHit = function (mX, mY, targets_num) {
if (mX >= this.hitbox_l_x && mX <= this.hitbox_r_x && mY >= this.hitbox_t_y && mY <= this.hitbox_b_y) {
            targets.splice(targets_num, 1);
            point += 1;
   }
   }
}//ppppppp
//THIS ENTIRE FUNCTION IS FOR THE DESIGN OF THE SQUARE TARGETS AND THEIR DESIGN
//pp

function Ellipses(x, y, stop_x, face) {
    this.x = x
    this.y = y
    this.stop = stop_x;//pp
    this.onMark = false;

    this.display = function () {
        ellipse(20 + this.x, 20 + this.y, 30, 30)
        ellipse(20 + this.x, 20 + this.y, 15, 15)
    }
    this.moveRight = function () {
        this.x = this.x + 1;
    }
    this.moveLeft = function () {
        this.x = this.x - 1;
    }
    this.spoint_qm = function () {
        if (this.x == this.stop) {
            this.onMark = true;
        } else {
            this.onMark = false;
        }
    }
    this.answer = function () {
        if (this.onMark) {
            this.x = 420;
            this.delayStart = millis() / 1000;
            } else {
            if (millis() / 1000 - this.delayStart == 2) {
                this.x = x;
            }
        }
    }
}


    //THIS ENTIRE FUNCTION IS MEANT FOR THE "CIRCULAR TARGET THAT MOVES" DESIGN AND WHERE IT SHOULD FACE AND MOVE AND DISAPPEARppp