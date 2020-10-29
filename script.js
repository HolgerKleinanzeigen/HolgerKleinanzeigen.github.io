function roll_dice(dice_row, dice_nr, dice_face, exp) {

  var seed = 1;
  var rnd = 1;
  var use_seed = document.getElementById("use_seed").checked;

  seed = document.getElementById("seed").value;

  if (use_seed == 1) {
    rnd = rand_nr(6, (seed+dice_row+dice_nr+dice_face));
  }
  else {
    rnd = (Math.floor( Math.random() * 6 ) + 1);
  }
  document.getElementById("i_"+dice_row+"_"+dice_nr).src = "resources/Dice_"+exp+"_N"+dice_face+"_"+rnd+".svg";
  
  return rnd;
}

function roll_row(nr_row) {
  
  var roll = [6];
  
  for (k = 1; k <= 6; k++) {
    document.getElementById("i_"+nr_row+"_"+k).src = "resources/Dice_Preset_empty.svg";
  }

  roll[0] = roll_dice(nr_row,1,1,"Normal");
  roll[1] = roll_dice(nr_row,2,1,"Normal");
  roll[2] = roll_dice(nr_row,3,2,"Normal");
  roll[3] = roll_dice(nr_row,4,3,"Normal");
  roll[4] = "0";
  roll[5] = "0";
  
  var expansion = document.getElementById('sel_expansion').value;
  
  switch (expansion) {
    case "engineer_renovation":
      roll[4] = roll_dice(nr_row,5,1,"Engineer"); break;
    case "engineer_separation_1":
      roll[1] = roll_dice(nr_row,2,2,"Engineer"); break;
    case "engineer_separation_2":
      roll[2] = roll_dice(nr_row,3,3,"Engineer"); break;
    case "engineer_special_1":
      roll[1] = roll_dice(nr_row,2,2,"Engineer"); break;
    case "engineer_special_2":
      roll[2] = roll_dice(nr_row,3,2,"Engineer"); break;
    case "engineer_special_3":
      roll[3] = roll_dice(nr_row,4,2,"Engineer"); break;
    case "desert":
      roll[4] = roll_dice(nr_row,5,1,"Desert");
      roll[5] = roll_dice(nr_row,6,1,"Desert");   break;
    case "canyon_1":
      roll[4] = roll_dice(nr_row,5,1,"Canyon");
      roll[5] = roll_dice(nr_row,6,1,"Canyon");   break;
    case "canyon_2":
      roll[4] = roll_dice(nr_row,5,2,"Canyon");
      roll[5] = roll_dice(nr_row,6,2,"Canyon");   break;
    case "river":
      roll[4] = roll_dice(nr_row,5,1,"River");
      roll[5] = roll_dice(nr_row,6,1,"River");    break;
    case "forest":
      roll[4] = roll_dice(nr_row,5,1,"Forest");
      roll[5] = roll_dice(nr_row,6,1,"Forest");   break;
    case "trail":
      roll[4] = roll_dice(nr_row,5,1,"Trail");
      roll[5] = roll_dice(nr_row,6,1,"Trail");    break;
      
    default: break;
  }
  
  document.getElementById("row_"+nr_row).value = ''.concat(roll[0],roll[1],roll[2],roll[3],roll[4],roll[5]);
  
} 

function set_row(nr_row) {
  
  for (k = 1; k <= 6; k++) {
    document.getElementById("i_"+nr_row+"_"+k).src = "resources/Dice_Preset_empty.svg";
  }
  
  set_dice(nr_row,1,1,"Normal");
  set_dice(nr_row,2,1,"Normal");  
  set_dice(nr_row,3,2,"Normal");  
  set_dice(nr_row,4,3,"Normal");

  var expansion = document.getElementById('sel_expansion').value;
  
  switch (expansion) {
    case "engineer_renovation":
      set_dice(nr_row,5,1,"Engineer");  break;
    case "engineer_separation_1":
      set_dice(nr_row,2,2,"Engineer");  break;
    case "engineer_separation_2":
      set_dice(nr_row,3,3,"Engineer");  break;
    case "engineer_special_1":
      set_dice(nr_row,2,2,"Engineer");  break;
    case "engineer_special_2":
       set_dice(nr_row,3,2,"Engineer"); break;
    case "engineer_special_3":
      set_dice(nr_row,4,2,"Engineer");  break;
    case "desert":
      set_dice(nr_row,5,1,"Desert");
      set_dice(nr_row,6,1,"Desert");    break;
    case "canyon_1":
      set_dice(nr_row,5,1,"Canyon");
      set_dice(nr_row,6,1,"Canyon");    break;
    case "canyon_2":
      set_dice(nr_row,5,2,"Canyon");
      set_dice(nr_row,6,2,"Canyon");    break;
    case "river":
      set_dice(nr_row,5,1,"River");
      set_dice(nr_row,6,1,"River");     break;
    case "forest":
      set_dice(nr_row,5,1,"Forest");
      set_dice(nr_row,6,1,"Forest");    break;
    case "trail":
      set_dice(nr_row,5,1,"Trail");
      set_dice(nr_row,6,1,"Trail");     break;
      
    default: break;
  }
  
}
  

function set_dice(dice_row, dice_nr, dice_face, exp) {
  
  var seed_full = document.getElementById("in_row_"+dice_row).value;
  var seed = 0;

  switch (dice_nr) {
    case 6: seed = Math.floor((seed_full / 1) % 10);       break;
    case 5: seed = Math.floor((seed_full / 10) % 10);      break;
    case 4: seed = Math.floor((seed_full / 100) % 10);     break;
    case 3: seed = Math.floor((seed_full / 1000) % 10);    break;
    case 2: seed = Math.floor((seed_full / 10000) % 10);   break;
    case 1: seed = Math.floor((seed_full / 100000) % 10);  break;
  }

  if (seed == 0) {
  }
  else {
    document.getElementById("i_"+dice_row+"_"+dice_nr).src = "resources/Dice_"+exp+"_N"+dice_face+"_"+seed+".svg";
  }
}

function roll_goal_1() {
  document.getElementById("goal_1").textContent = get_goal();
  set_round_limit();
}

function roll_goal_2() {
  document.getElementById("goal_2").textContent = get_goal();
  set_round_limit();
}

function roll_goal_3() {
  document.getElementById("goal_3").textContent = get_goal();
  set_round_limit();
}

function roll_goal_4() {
  document.getElementById("goal_4").textContent = get_goal_special();
  set_round_limit();
}
function rand_nr(cnt, seed) {
  //return (Math.floor( Math.random() * cnt ) + 1);
  return (Math.floor( mulberry32(seed) * cnt ) + 1);

}
 
function jsf32(a, b, c, d) {

  a |= 0; b |= 0; c |= 0; d |= 0;
  var t = a - (b << 27 | b >>> 5) | 0;
  a = b ^ (c << 17 | c >>> 15);
  b = c + d | 0;
  c = d + t | 0;
  d = a + t | 0;

  return ((d >>> 0) / 4294967296);
}

function mulberry32(a) {
  
  var t = a += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function get_goal() { 
  var goals = ["6 highways",
               "6 highways",
               "6 railways",
               "6 railways",
               "5 highways + 5 railways",
               
               "3 exits",              
               "5 exits",               
               "connect exits on opposing sides",     
               "connect exits on 3 differnt sides",   
               
               "5 dices in central space",       
               
               "3x3 routes",                 
               "1 route in each corner",     
               "7 routes in a row or coloumn",
               
               "3 special routes used",

               "1 circle",                 

               "1 village, 1 factory, 1 university",  
               "2 village, 2 factory, 2 university", 
               "4 stations linked",              
               "3 villages",
               
               "6 highways"
               ];

  return goals[(Math.floor( Math.random() * goals.length)+1)];
}

function get_goal_special() { 
  var goal_desert = ["2x2 Cacti",
                     "4x1 Cacti",
                     "3 Oasis to the same network"
                    ];  
  var goal_canyon = ["Spend at least 6 Bridge Points",
                     "Cross the same Canyon 3 times with the same path",
                     "Draw a Canyon with both ends connected to the edge and through Central Area"
                    ];
  var goal_forest = ["5 connected Forests",
                     "2x2 Forest",
                     "Cross the same Forest twice"
                    ];
  var goal_trail  = ["5 Trails in Central Area",
                     "3 Stations connected by Trails",
                     "Trail circle "
                    ];
  var goal_river  = ["Cross the same River twice",
                     "3 Rivers in Central Area",
                     "2 closed rivers"
                    ];
                    
  var expansion_lg = document.getElementById('sel_expansion').value;
  
  if (expansion_lg == "desert"){
    return goal_desert[(Math.floor( Math.random() * goal_desert.length))];
  }  
  else if (expansion_lg == "canyon_2"){
    return goal_canyon[(Math.floor( Math.random() * goal_canyon.length))];
  }
  else if (expansion_lg == "forest"){
    return goal_forest[(Math.floor( Math.random() * goal_forest.length))];
  }
  else if (expansion_lg == "trail"){
    return goal_trail[(Math.floor( Math.random() * goal_trail.length))];
  }
  else {
    return (" ");
  }
}

function set_round_limit() {
  var expansion_lg = document.getElementById('sel_expansion').value;
  
  if ((expansion_lg == "engineer_renovation") || ( expansion_lg == "desert")|| ( expansion_lg == "river")|| ( expansion_lg == "canyon")|| ( expansion_lg == "forest")|| ( expansion_lg == "trail")){
    document.getElementById("round_limit").value = "6";
  }
  else {
    document.getElementById("round_limit").textContent = "7";
  }
}  

function reset() {

  for (i = 1; i <= 4; i++) {
    document.getElementById("goal_"+i).textContent = " ";
  }
  
  document.getElementById("round_limit").textContent = " ";
  
  for (i = 1; i <= 7; i++) {
      for (j = 1; j <= 6; j++) {
        document.getElementById("i_"+i+"_"+j).src = "resources/Dice_Preset_empty.svg";
      }
  }
  
}

document.getElementById("roll_dice_r1").onclick  = function(){roll_row(1)};
document.getElementById("roll_dice_r2").onclick  = function(){roll_row(2)};
document.getElementById("roll_dice_r3").onclick  = function(){roll_row(3)};
document.getElementById("roll_dice_r4").onclick  = function(){roll_row(4)};
document.getElementById("roll_dice_r5").onclick  = function(){roll_row(5)};
document.getElementById("roll_dice_r6").onclick  = function(){roll_row(6)};
document.getElementById("roll_dice_r7").onclick  = function(){roll_row(7)};

document.getElementById("set_row_1").onclick  = function(){set_row(1)};
document.getElementById("set_row_2").onclick  = function(){set_row(2)};
document.getElementById("set_row_3").onclick  = function(){set_row(3)};
document.getElementById("set_row_4").onclick  = function(){set_row(4)};
document.getElementById("set_row_5").onclick  = function(){set_row(5)};
document.getElementById("set_row_6").onclick  = function(){set_row(6)};
document.getElementById("set_row_7").onclick  = function(){set_row(7)};

document.getElementById("roll_goal_1").onclick   = roll_goal_1;
document.getElementById("roll_goal_2").onclick   = roll_goal_2;
document.getElementById("roll_goal_3").onclick   = roll_goal_3;
document.getElementById("roll_goal_4").onclick   = roll_goal_4;
document.getElementById("reset").onclick         = reset;

var exa = "PHN2ZyBpZD0ibXlTdmdFbGVtZW50IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTc5LjIiIHdpZHRoPSIxNzkuMiI+CgkgICAgPGc+CgkgICAgCTxwYXRoIHRyYW5zZm9ybT0ic2NhbGUoMC4xLC0wLjEpIHRyYW5zbGF0ZSgwLC0xNTM2KSIgZD0iTTE1MzYgMjI0djcwNHEwIDQwIC0yOCA2OHQtNjggMjhoLTcwNHEtNDAgMCAtNjggMjh0LTI4IDY4djY0cTAgNDAgLTI4IDY4dC02OCAyOGgtMzIwcS00MCAwIC02OCAtMjh0LTI4IC02OHYtOTYwcTAgLTQwIDI4IC02OHQ2OCAtMjhoMTIxNnE0MCAwIDY4IDI4dDI4IDY4ek0xNjY0IDkyOHYtNzA0cTAgLTkyIC02NiAtMTU4dC0xNTggLTY2aC0xMjE2cS05MiAwIC0xNTggNjZ0LTY2IDE1OHY5NjBxMCA5MiA2NiAxNTh0MTU4IDY2aDMyMCBxOTIgMCAxNTggLTY2dDY2IC0xNTh2LTMyaDY3MnE5MiAwIDE1OCAtNjZ0NjYgLTE1OHoiIHN0eWxlPSImIzEwOyAgICBmaWxsOiAjMDNhOWY0OyYjMTA7Ii8+CgkgICAgPC9nPgogIDwvc3ZnPg==";


