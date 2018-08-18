(function () {

   var nav = document.querySelector(".hero_nav");
   var openNavIcon = document.querySelector(".hero_menu");
   var closeNavIcon = null;

   if(openNavIcon){
       openNavIcon.addEventListener('click',function () {
           open();
       });

   }

   function onClose(e) {
       e.preventDefault();
       close();
       closeNavIcon.removeEventListener('click',onClose);
   }

   function open() {
       nav.classList.remove("is-hidden");
       closeNavIcon = document.querySelector(".hero_nav_close");
       closeNavIcon.addEventListener('click',onClose);
   }

    function close() {
        nav.classList.add("is-hidden")

    }

}());