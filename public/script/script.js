$(function(){
    var shrinkHeader = 300;
     $(window).scroll(function() {
       var scroll = getCurrentScroll();
         if ( scroll >= shrinkHeader ) {
              $('header').addClass('shrink');
              $('.icon_rex').addClass('taille');
              

           }
           else {
               $('header').removeClass('shrink');
               $('.icon_rex').removeClass('taille');
               
               
           }
     });
   function getCurrentScroll() {
       return window.pageYOffset || document.documentElement.scrollTop;
       }

       
    
   });

   function change(){
    var button1 = document.getElementsByClassName("un").item(0);
    var button2 = document.getElementsByClassName("deux").item(0);
    var button3 = document.getElementsByClassName("trois").item(0);
    var button4 = document.getElementsByClassName("quattre").item(0);

    var v = button1.getAttribute("src");
    var v2 = button1.getAttribute("src");
    var v3 = button1.getAttribute("src");
    var v4 = button1.getAttribute("src");


    
    
    if (v == "../img/portrait/1.png" ){
      v = "../img/portrait/2.png";
      $(".modif").text("Equipe B");
      $(".modif_button").text("Voir Equipe A");

    }else{
      v = "../img/portrait/1.png";
      $(".modif").text("Equipe A");
      $(".modif_button").text("Voir Equipe B");
      
    }

    if (v2 != "../img/portrait/2.png" ){
      v2 = "../img/portrait/2.png";
    }else{
      v2 = "../img/portrait/1.png";
    }

    if (v3 != "img/portrait/2.png" ){
      v3 = "../img/portrait/2.png";
    }else{
      v3 = "../img/portrait/1.png";
    }


    if (v4 != "../img/portrait/2.png" ){
      v4 = "../img/portrait/2.png";
    }else{
      v4 = "../img/portrait/1.png";
    }
    
    button1.setAttribute("src",v);
    button2.setAttribute("src",v2);
    button3.setAttribute("src",v3);
    button4.setAttribute("src",v4);
  }


    

   





